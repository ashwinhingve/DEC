'use client'
import React, { useState, useEffect } from 'react';
import { Download, Eye, Trash2, Search, Briefcase, FileText } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTermss, setSearchTermss] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedResume, setSelectedResume] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);

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
    fetchAllResumes();
  }, []);

  const fetchAllResumes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/resumes');

      if (!response.ok) {
        throw new Error('Failed to fetch resumes');
      }

      const data = await response.json();
      setResumes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        const response = await fetch(`/api/resumes/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete resume');
        }

        // Remove from state
        setResumes(resumes.filter(resume => resume._id !== id));
      } catch (error) {
        console.error('Error deleting resume:', error);
      }
    }
  };

  const viewPdf = async (id) => {
    try {
      setSelectedResume(id);
      setShowPdfModal(true);
    } catch (error) {
      console.error('Error viewing PDF:', error);
    }
  };

  // Filter and search functions
  const filteredResumes = resumes
    .filter(resume => {
      if (filter === 'all') return true;
      if (filter === 'recent') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return new Date(resume.createdAt) >= oneWeekAgo;
      }
      return false;
    })
    .filter(resume => {
      if (!searchTermss) return true;
      const searchLower = searchTermss.toLowerCase();
      const personalInfo = resume.userData?.personal || {};
      return (
        personalInfo.fullName?.toLowerCase().includes(searchLower) ||
        personalInfo.email?.toLowerCase().includes(searchLower) ||
        personalInfo.jobTitle?.toLowerCase().includes(searchLower)
      );
    });

  // Modal to display PDF
  const PdfModal = () => {
    if (!selectedResume) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-4 w-full max-w-4xl max-h-screen flex flex-col">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Resume Preview</h2>
            <button 
              onClick={() => setShowPdfModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            <iframe
              src={`/api/resumes/${selectedResume}`}
              className="w-full h-full min-h-screen"
              title="Resume PDF"
            />
          </div>
        </div>
      </div>
    );
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Resume Management Dashboard</h1>
            <a 
              href="/profile"
              className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
            >
              Back to Builder
            </a>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or job title..."
                className="pl-10 p-2 w-full border rounded-lg"
                value={searchTermss}
                onChange={(e) => setSearchTermss(e.target.value)}
              />
            </div>
            
            <div className="flex-none">
              <select
                className="p-2 border rounded-lg w-full md:w-auto"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Resumes</option>
                <option value="recent">Last 7 Days</option>
              </select>
            </div>
          </div>
          
          {/* Resumes Table */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading resumes...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : filteredResumes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No resumes found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredResumes.map((resume) => (
                    <tr key={resume._id} className="hover:bg-gray-50">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {resume.userData?.personal?.fullName || 'N/A'}
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {resume.userData?.personal?.email || 'N/A'}
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {resume.userData?.personal?.jobTitle || 'N/A'}
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(resume.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => viewPdf(resume._id)}
                            className="text-blue-600 hover:text-blue-800"
                            title="View PDF"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <a
                            href={`/api/resumes/${resume._id}/download`}
                            className="text-green-600 hover:text-green-800"
                            title="Download PDF"
                          >
                            <Download className="h-5 w-5" />
                          </a>
                          <button
                            onClick={() => deleteResume(resume._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete Resume"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Summary Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-700 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-blue-800">Total Resumes</h3>
                  <p className="text-2xl font-bold">{resumes.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Download className="h-8 w-8 text-green-700 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-green-800">This Week</h3>
                  <p className="text-2xl font-bold">
                    {resumes.filter(r => {
                      const oneWeekAgo = new Date();
                      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                      return new Date(r.createdAt) >= oneWeekAgo;
                    }).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Briefcase className="h-8 w-8 text-purple-700 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-purple-800">Common Title</h3>
                  <p className="text-xl font-bold truncate">
                    {(() => {
                      const titles = resumes
                        .map(r => r.userData?.personal?.jobTitle)
                        .filter(Boolean);
                      
                      if (titles.length === 0) return 'N/A';
                      
                      const titleCount = {};
                      titles.forEach(title => {
                        titleCount[title] = (titleCount[title] || 0) + 1;
                      });
                      
                      return Object.entries(titleCount)
                        .sort((a, b) => b[1] - a[1])[0][0];
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* PDF Modal */}
      {showPdfModal && <PdfModal />}
    </div>
  );
};

export default AdminDashboard;