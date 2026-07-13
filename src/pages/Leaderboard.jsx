import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getLeaderboard } from '../services/config';
import { Award, User, Home } from 'lucide-react';
import LeaderboardDashboardSkeleton from '../components/leaderboard/LeaderboardDashboardSkeleton';


const Leaderboard = ({ quiz, onHome }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLeaderboard = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getLeaderboard(quiz.id, 10);
      console.log('Leaderboard result:', result);
      if (result.success) {
        setLeaderboard(result.data);
      } else {
        setError(result.error || 'Failed to load leaderboard');
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      setError('Failed to load leaderboard: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz.id]);

useEffect(() => {
  document.title = quiz?.title
    ? ` Leaderboard | ${quiz.title}`
    : ' Leaderboard';
}, [quiz?.title]);

  const getRankIcon = (index) => {
    if (index === 0) return <Award className="text-yellow-500 text-2xl" />;
    if (index === 1) return <Award className="text-gray-400 text-2xl" />;
    if (index === 2) return <Award className="text-orange-600 text-2xl" />;
    return <span className="text-lg font-bold text-gray-500">#{index + 1}</span>;
  };

  const getRankBg = (index) => {
    if (index === 0) return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
    if (index === 1) return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
    if (index === 2) return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200';
    return 'bg-white border-gray-200';
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return <LeaderboardDashboardSkeleton />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4 mt-1">
            <Award className="text-4xl text-yellow-500 size-10" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Leaderboard
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Top scores for <span className="font-semibold text-blue-600">{quiz.title}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
        >
          {error ? (
            <div className="text-center py-20">
              <Award className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Leaderboard Unavailable</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <p className="text-sm text-gray-500 mb-4">Make sure Firebase is configured in .env file</p>
              <button
                onClick={loadLeaderboard}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-20">
              <Award className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No scores yet</h3>
              <p className="text-gray-500">Be the first to complete this quiz!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 ${getRankBg(index)}`}
                >
                  <div className="flex-shrink-0 w-12 text-center">
                    {getRankIcon(index)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="text-gray-500 flex-shrink-0" />
                      <p className="font-semibold text-gray-900 truncate">
{entry.name?.trim() ? entry.name : '—'}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatDate(entry.completedAt)}
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <p className="text-2xl font-bold text-gray-900">{entry.score}</p>
                    <p className="text-xs text-gray-500">{entry.percentage}%</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onHome}
            className="w-full mt-6 py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home />
            <span>Back to Home</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;