import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function HistoryList({ userId }) {
  const [histories, setHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [userId]);

  const fetchHistory = async () => {
    try {
      const q = query(
        collection(db, 'summaries'),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHistories(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center border border-white/20">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg mb-4">
          <svg className="w-6 h-6 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <p className="text-gray-300">Loading history...</p>
      </div>
    );
  }

  if (histories.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-12 text-center border border-white/20">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0h6M6 12h6m0 0H6" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No Summaries Yet</h3>
        <p className="text-gray-300">Generate your first summary to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {histories.map((item) => (
        <div key={item.id} className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20 hover:border-white/40 transition">
          <div className="flex items-start justify-between mb-4">
            <div className="text-xs font-semibold text-purple-300 bg-purple-500/30 px-3 py-1 rounded-full">
              📅 {new Date(item.timestamp).toLocaleString()}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">Original Text</h4>
              <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed">{item.originalText}</p>
            </div>
            <div className="border-t border-white/10 pt-4">
              <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">Summary</h4>
              <p className="text-sm text-gray-100 leading-relaxed">{item.summary}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

