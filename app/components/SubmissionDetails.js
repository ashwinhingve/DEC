// components/SubmissionDetails.js
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function SubmissionDetails({ submission, onClose }) {
  if (!submission) return null;

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
            
            <div className="flex justify-end">
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