'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminTeamMembers() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState(null);
  const [newMember, setNewMember] = useState({
    name: '',
    position: '',
    image: '',
    description: '',
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
    fetchTeamMembers();
  }, []);

  async function fetchTeamMembers() {
    try {
      setLoading(true);
      const response = await fetch('/api/team-members');
      const result = await response.json();
      
      if (result.success) {
        setTeamMembers(result.data);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
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
          setEditingMember({
            ...editingMember,
            image: result.filePath,
          });
        } else {
          setNewMember({
            ...newMember,
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

  // Create a new team member
  async function createTeamMember() {
    try {
      const response = await fetch('/api/team-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setTeamMembers([result.data, ...teamMembers]);
        setNewMember({
          name: '',
          position: '',
          image: '',
          description: '',
        });
        setIsAddingNew(false);
      }
    } catch (error) {
      console.error('Error creating team member:', error);
    }
  }

  // Update a team member
  async function updateTeamMember() {
    try {
      const response = await fetch(`/api/team-members/${editingMember._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingMember),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setTeamMembers(
          teamMembers.map((member) =>
            member._id === editingMember._id ? result.data : member
          )
        );
        setEditingMember(null);
      }
    } catch (error) {
      console.error('Error updating team member:', error);
    }
  }

  // Delete a team member
  async function deleteTeamMember(id) {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      const response = await fetch(`/api/team-members/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        setTeamMembers(teamMembers.filter((member) => member._id !== id));
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  }

  if (loading) {
    return <div className="text-center py-10">Loading team members...</div>;
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }


  return (
    <div className="p-6">
            <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Team Members</h1>
        {!isAddingNew && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Plus size={16} /> Add New Member
          </button>
        )}
      </div>

      {/* Add new team member form */}
      {isAddingNew && (
        <div className="mb-8 p-6 border rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add New Team Member</h2>
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
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                  placeholder="Enter name"
                  className="border p-2 w-full rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Position</label>
                <input
                  type="text"
                  value={newMember.position}
                  onChange={(e) =>
                    setNewMember({ ...newMember, position: e.target.value })
                  }
                  placeholder="Enter position"
                  className="border p-2 w-full rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, false)}
                  className="border p-2 w-full rounded-md"
                />
                {uploadingImage && <p className="text-sm mt-1">Uploading...</p>}
                {newMember.image && (
                  <div className="mt-2 relative h-40 w-full">
                    <Image
                      src={newMember.image}
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
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newMember.description}
                  onChange={(e) =>
                    setNewMember({ ...newMember, description: e.target.value })
                  }
                  placeholder="Enter description"
                  rows="5"
                  className="border p-2 w-full rounded-md"
                ></textarea>
              </div>

              <button
                onClick={createTeamMember}
                disabled={
                  !newMember.name ||
                  !newMember.position ||
                  !newMember.image ||
                  !newMember.description
                }
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
              >
                <Save size={16} /> Save Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Team members list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member._id} className="border rounded-lg overflow-hidden shadow-sm">
            {/* Edit mode */}
            {editingMember && editingMember._id === member._id ? (
              <div className="p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={editingMember.name}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, name: e.target.value })
                    }
                    className="border p-2 w-full rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Position</label>
                  <input
                    type="text"
                    value={editingMember.position}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        position: e.target.value,
                      })
                    }
                    className="border p-2 w-full rounded-md"
                  />
                </div>

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
                      src={editingMember.image}
                      alt="Preview"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-md"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={editingMember.description}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        description: e.target.value,
                      })
                    }
                    rows="4"
                    className="border p-2 w-full rounded-md"
                  ></textarea>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={updateTeamMember}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    <Save size={16} /> Save
                  </button>
                  <button
                    onClick={() => setEditingMember(null)}
                    className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    <X size={16} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* View mode */
              <>
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                  <p className="text-gray-600 mb-4 line-clamp-3">{member.description}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setEditingMember(member)}
                      className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => deleteTeamMember(member._id)}
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
