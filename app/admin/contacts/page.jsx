 "use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SubmissionDetails from '../../components/SubmissionDetails';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Search, RefreshCw } from 'lucide-react';

export default function AdminPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/submissions');
        
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        
        const data = await response.json();
        setSubmissions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubmissions();
  }, []);
  
  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/submissions');
      
      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }
      
      const data = await response.json();
      setSubmissions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

   // Handle submission deletion
   const handleDelete = (deletedId) => {
    setSubmissions(prevSubmissions => 
      prevSubmissions.filter(sub => sub._id !== deletedId)
    );
  };

  const filteredSubmissions = submissions
  .filter(sub => activeTab === 'all' || sub.contactType === activeTab)
  .filter(sub => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      sub.name?.toLowerCase().includes(searchLower) ||
      sub.email?.toLowerCase().includes(searchLower) ||
      sub.phone?.toLowerCase().includes(searchLower) ||
      sub.subject?.toLowerCase().includes(searchLower) ||
      sub.company?.toLowerCase().includes(searchLower) ||
      sub.message?.toLowerCase().includes(searchLower)
    );
  });

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Contact Form Submissions</h1>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              <button
                onClick={fetchSubmissions}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                title="Refresh submissions"
              >
                <RefreshCw size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex mb-6 border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 mr-4 font-medium whitespace-nowrap ${
                activeTab === 'all' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              All Submissions
            </button>
            <button
              onClick={() => setActiveTab('applicant')}
              className={`px-4 py-2 mr-4 font-medium whitespace-nowrap ${
                activeTab === 'applicant' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Applicants
            </button>
            <button
              onClick={() => setActiveTab('recruiter')}
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'recruiter' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Recruiters
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>Error: {error}</p>
            </div>
          ) : filteredSubmissions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Phone</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Subject</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Type</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission._id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{submission.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{submission.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{submission.phone}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 truncate max-w-[150px]">{submission.subject}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          submission.contactType === 'recruiter' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {submission.contactType}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{formatDate(submission.createdAt)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        <div className="flex space-x-2">
                          <button 
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => setSelectedSubmission(submission)}
                          >
                            View Details
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800"
                            onClick={async () => {
                              if (confirm('Are you sure you want to delete this submission?')) {
                                try {
                                  const response = await fetch(`/api/submissions/${submission._id}`, {
                                    method: 'DELETE',
                                  });
                                  
                                  if (response.ok) {
                                    handleDelete(submission._id);
                                  } else {
                                    throw new Error('Failed to delete submission');
                                  }
                                } catch (err) {
                                  setError(err.message);
                                }
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-8 text-gray-500">No submissions found.</p>
          )}
        </motion.div>
      </div>
      
      {/* Submission Details Modal */}
      {selectedSubmission && (
        <SubmissionDetails 
          submission={selectedSubmission} 
          onClose={() => setSelectedSubmission(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}