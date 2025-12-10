import { useDispatch, useSelector } from 'react-redux';
import { setText, generateSummary, clearSummary } from '../../redux/slices/summarySlice';

export default function SummaryGenerator({ userId }) {
  const dispatch = useDispatch();
  const { currentText, currentSummary, loading, error } = useSelector((state) => state.summary);

  const handleGenerateSummary = () => {
    if (!currentText.trim()) return;
    dispatch(generateSummary({ text: currentText, userId }));
  };

  const handleClear = () => {
    dispatch(clearSummary());
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
        <label className="block text-sm font-semibold text-purple-100 mb-4">
          📝 Enter Text to Summarize
        </label>
        <textarea
          value={currentText}
          onChange={(e) => dispatch(setText(e.target.value))}
          maxLength={5000}
          className="w-full h-48 px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-purple-200 resize-none transition"
          placeholder="Paste your text here..."
        />
        <div className="mt-2 text-xs text-purple-300 text-right">{currentText.length}/5000</div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleGenerateSummary}
            disabled={loading || !currentText.trim()}
            className="cursor-pointer px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 transition transform hover:scale-105 shadow-lg"
          >
            {loading ? '⏳ Generating...' : '✨ Generate Summary'}
          </button>
          
          {currentSummary && currentSummary.length > 0 && (
            <button
              onClick={handleClear}
              className="cursor-pointer px-8 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition border border-white/30"
            >
              🗑️ Clear
            </button>
          )}
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-200 bg-red-500/20 p-4 rounded-lg border border-red-500/30 backdrop-blur">
            ⚠️ Error: {error}
          </div>
        )}
      </div>
      {currentSummary && currentSummary.length > 0 && (
        <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent mb-6">📋 Summary Points</h3>
            <div className="space-y-3">
            {currentSummary?.map((point, index) => (
                <div key={index} className="flex gap-3 p-4 bg-white/10 rounded-lg border border-white/20">
                  <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold">{index + 1}</span>
                  <p className="text-gray-100">{point}</p>
                </div>
            ))}
            </div>
        </div>
        )}
    </div>
  );
}