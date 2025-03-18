// components/SubmissionDetails.js
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, AlertCircle } from 'lucide-react';

export default function SubmissionDetails({ submission, onClose, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  
  if (!submission) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/submissions/${submission._id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete submission');
      }
      
      // If deletion was successful, notify the parent component
      onDelete(submission._id);
      onClose();
    } catch (error) {
      console.error('Error deleting submission:', error);
      alert('Failed to delete submission: ' + error.message);
    } finally {
      setIsDeleting(false);
      setShowConfirmDelete(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center border-b p-4">
            <h3 className="text-xl font-bold text-gray-800">Submission Details</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            {/* Delete Confirmation */}
            {showConfirmDelete && (
              <div className="mb-6 bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-2">
                  <AlertCircle className="text-red-500 mr-2" size={20} />
                  <h4 className="font-medium text-red-700">Confirm Deletion</h4>
                </div>
                <p className="text-red-600 mb-4">Are you sure you want to delete this submission? This action cannot be undone.</p>
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => setShowConfirmDelete(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                submission.contactType === 'recruiter' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {submission.contactType}
              </span>
              <p className="text-sm text-gray-500 mt-2">
                Submitted on {new Date(submission.createdAt).toLocaleString()}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Name</h4>
                <p className="text-gray-900">{submission.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                <p className="text-gray-900">{submission.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                <p className="text-gray-900">{submission.phone}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Subject</h4>
                <p className="text-gray-900">{submission.subject}</p>
              </div>
            </div>
            
            {submission.contactType === 'recruiter' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Company</h4>
                  <p className="text-gray-900">{submission.company}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Industry</h4>
                  <p className="text-gray-900">{submission.industry}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Job Offers</h4>
                  <p className="text-gray-900">{submission.jobOffers}</p>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Message</h4>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-900 whitespace-pre-wrap">{submission.message}</p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => setShowConfirmDelete(true)}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors flex items-center"
                disabled={isDeleting}
              >
                <Trash2 className="mr-2" size={16} />
                Delete
              </button>
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}