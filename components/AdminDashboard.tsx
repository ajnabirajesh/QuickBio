import React, { useState, useEffect } from 'react';
import { ResumeData } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
  onViewResume: (resume: ResumeData) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onViewResume }) => {
  const [savedResumes, setSavedResumes] = useState<{ id: string; data: ResumeData; savedAt: string }[]>([]);

  useEffect(() => {
    const loadResumes = () => {
      const stored = localStorage.getItem('quickbio_saved_resumes');
      if (stored) {
        try {
          setSavedResumes(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse saved resumes", e);
        }
      }
    };
    
    loadResumes();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const updated = savedResumes.filter(r => r.id !== id);
      setSavedResumes(updated);
      localStorage.setItem('quickbio_saved_resumes', JSON.stringify(updated));
    }
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-slate-900 p-6 md:p-12 overflow-y-auto transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
              <i className="fas fa-user-shield text-indigo-600 dark:text-indigo-400"></i>
              Admin Dashboard
            </h2>
            <p className="text-gray-500 dark:text-slate-400 mt-1">Manage saved resumes and user data.</p>
          </div>
          
          <button 
            onClick={onLogout}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2 shadow-sm"
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Saved Resumes</h3>
            <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold px-3 py-1 rounded-full">
              {savedResumes.length} Total
            </span>
          </div>
          
          {savedResumes.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-folder-open text-2xl text-gray-400 dark:text-slate-500"></i>
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No resumes saved yet</h4>
              <p className="text-gray-500 dark:text-slate-400 max-w-sm mx-auto">
                When users save their resumes, they will appear here for you to manage.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-800/80 border-b border-gray-200 dark:border-slate-700">
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Contact</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Template</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Saved On</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {savedResumes.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-gray-900 dark:text-white">{item.data.name || 'Unnamed'}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400 truncate max-w-[200px]">{item.data.personalDetails.careerObjective || 'No objective'}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-700 dark:text-slate-300">{item.data.contact || '-'}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400">{item.data.personalDetails.email || '-'}</div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {item.data.template}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500 dark:text-slate-400">
                        {new Date(item.savedAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button 
                          onClick={() => onViewResume(item.data)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                          title="View Resume"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Delete Resume"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
