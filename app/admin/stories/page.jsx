'use client';

import { useState, useEffect } from 'react';
import { BarChart, Presentation, Users, FileSpreadsheet, Trash2, Edit, Plus, Save, X } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStory, setEditingStory] = useState(null);
  const [newStory, setNewStory] = useState({
    image: '',
    iconType: 'BarChart',
    alt: '',
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchAndValidate = async () => {
      // Authentication checks
      if (!isAuthenticated) {
        router.push('/auth');
        return;
      }

      if (user?.role !== 'admin') {
        toast.error('Unauthorized access');
        router.push('/profile');
        return;
      }

    };

    fetchAndValidate();
  }, [isAuthenticated, user, router]);
 
  

  useEffect(() => {
    fetchStories();
  }, []);

  async function fetchStories() {
    try {
      setLoading(true);
      const response = await fetch('/api/stories');
      const result = await response.json();
      
      if (result.success) {
        setStories(result.data);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  }

  // Image upload handler
  async function handleImageUpload(e, isForEdit = false) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        if (isForEdit) {
          setEditingStory({
            ...editingStory,
            image: result.filePath,
          });
        } else {
          setNewStory({
            ...newStory,
            image: result.filePath,
          });
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploadingImage(false);
    }
  }

  // Create a new story
  async function createStory() {
    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStory),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStories([result.data, ...stories]);
        setNewStory({
          image: '',
          iconType: 'BarChart',
          alt: '',
        });
        setIsAddingNew(false);
      }
    } catch (error) {
      console.error('Error creating story:', error);
    }
  }

  // Update a story
  async function updateStory() {
    try {
      const response = await fetch(`/api/stories/${editingStory._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingStory),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStories(
          stories.map((story) =>
            story._id === editingStory._id ? result.data : story
          )
        );
        setEditingStory(null);
      }
    } catch (error) {
      console.error('Error updating story:', error);
    }
  }

  // Delete a story
  async function deleteStory(id) {
    if (!confirm('Are you sure you want to delete this story?')) return;
    
    try {
      const response = await fetch(`/api/stories/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStories(stories.filter((story) => story._id !== id));
      }
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  }

  // Function to render the appropriate icon based on iconType
  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'BarChart':
        return <BarChart className="w-6 h-6" />;
      case 'Presentation':
        return <Presentation className="w-6 h-6" />;
      case 'Users':
        return <Users className="w-6 h-6" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-6 h-6" />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading stories...</div>;
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }


  return (
    <div className="p-6">
            <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Stories</h1>
        {!isAddingNew && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Plus size={16} /> Add New Story
          </button>
        )}
      </div>

      {/* Add new story form */}
      {isAddingNew && (
        <div className="mb-8 p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add New Story</h2>
            <button
              onClick={() => setIsAddingNew(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, false)}
                  className="border p-2 w-full rounded-md"
                />
                {uploadingImage && <p className="text-sm mt-1">Uploading...</p>}
                {newStory.image && (
                  <div className="mt-2 relative h-40 w-full">
                    <Image
                      src={newStory.image}
                      alt="Preview"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Icon Type</label>
                <select
                  value={newStory.iconType}
                  onChange={(e) =>
                    setNewStory({ ...newStory, iconType: e.target.value })
                  }
                  className="border p-2 w-full rounded-md"
                >
                  <option value="BarChart">Bar Chart</option>
                  <option value="Presentation">Presentation</option>
                  <option value="Users">Users</option>
                  <option value="FileSpreadsheet">File Spreadsheet</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Alt Text</label>
                <input
                  type="text"
                  value={newStory.alt}
                  onChange={(e) =>
                    setNewStory({ ...newStory, alt: e.target.value })
                  }
                  placeholder="Enter alt text"
                  className="border p-2 w-full rounded-md"
                />
              </div>

              <button
                onClick={createStory}
                disabled={!newStory.image || !newStory.alt}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
              >
                <Save size={16} /> Save Story
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stories list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="border rounded-lg overflow-hidden shadow-sm">
            {/* Edit mode */}
            {editingStory && editingStory._id === story._id ? (
              <div className="p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                    className="border p-2 w-full rounded-md"
                  />
                  {uploadingImage && <p className="text-sm mt-1">Uploading...</p>}
                  <div className="mt-2 relative h-40 w-full">
                    <Image
                      src={editingStory.image}
                      alt="Preview"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-md"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Icon Type</label>
                  <select
                    value={editingStory.iconType}
                    onChange={(e) =>
                      setEditingStory({
                        ...editingStory,
                        iconType: e.target.value,
                      })
                    }
                    className="border p-2 w-full rounded-md"
                  >
                    <option value="BarChart">Bar Chart</option>
                    <option value="Presentation">Presentation</option>
                    <option value="Users">Users</option>
                    <option value="FileSpreadsheet">File Spreadsheet</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={editingStory.alt}
                    onChange={(e) =>
                      setEditingStory({
                        ...editingStory,
                        alt: e.target.value,
                      })
                    }
                    className="border p-2 w-full rounded-md"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={updateStory}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    <Save size={16} /> Save
                  </button>
                  <button
                    onClick={() => setEditingStory(null)}
                    className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    <X size={16} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* View mode */
              <>
                <div className="relative h-48 w-full">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full">
                    {renderIcon(story.iconType)}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">{story.alt}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingStory(story)}
                      className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => deleteStory(story._id)}
                      className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
