import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import SummaryGenerator from '../Summary/SummaryGenerator';
import HistoryList from '../History/HistoryList';

export default function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState('summary');

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 1.5H5.75A2.75 2.75 0 0 0 3 4.25v11.5A2.75 2.75 0 0 0 5.75 18.5h8.5a2.75 2.75 0 0 0 2.75-2.75V8.75m-12.5-4h10m-10 3h10m-10 3h10"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">AI Summary</h1>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-300">{user.email}</span>
              <button
                onClick={handleLogout}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveTab('summary')}
            className={`cursor-pointer px-6 py-3 rounded-lg font-semibold transition transform ${
              activeTab === 'summary'
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            ✨ Generate Summary
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`cursor-pointer px-6 py-3 rounded-lg font-semibold transition transform ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            📋 History
          </button>
        </div>

        {activeTab === 'summary' ? (
          <SummaryGenerator userId={user.uid} />
        ) : (
          <HistoryList userId={user.uid} />
        )}
      </div>
    </div>
  );
}