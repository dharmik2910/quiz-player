import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Check, X, TrendingUp, RefreshCw, Home, Send, Trophy, User } from 'lucide-react';
import { getLeaderboard } from '../services/config';

const ResultScreen = ({ result, quizId, quizTitle, onPlayAgain, onHome }) => {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);
  const [message, setMessage] = useState({
    show: false,
    text: '',
    type: 'success',
  });

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return { message: 'Outstanding!', emoji: '🏆', color: 'text-yellow-700', bg: 'bg-yellow-100' };
    if (percentage >= 70) return { message: 'Excellent!', emoji: '🌟', color: 'text-green-700', bg: 'bg-green-100' };
    if (percentage >= 50) return { message: 'Good Job!', emoji: '👍', color: 'text-blue-700', bg: 'bg-blue-100' };
    if (percentage >= 30) return { message: "Don't Give Up!", emoji: '💪', color: 'text-orange-700', bg: 'bg-orange-100' };
    return { message: 'Need Practice', emoji: '📚', color: 'text-red-700', bg: 'bg-red-100' };
  };

  const performance = getPerformanceMessage(result.percentage);

  const showMessage = (text, type = 'success') => {
    setMessage({
      show: true,
      text,
      type,
    });

    setTimeout(() => {
      setMessage({
        show: false,
        text: '',
        type,
      });
    }, 3000);
  };

  // Load leaderboard
  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setIsLoadingLeaderboard(true);
        const response = await getLeaderboard(quizId, 10);
        if (response.success) {
          setLeaderboard(response.data);
        }
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      } finally {
        setIsLoadingLeaderboard(false);
      }
    };
    loadLeaderboard();
  }, [quizId]);

  const handleSubmitScore = async () => {
    if (!playerName.trim()) {
      showMessage('Please enter your name.', 'error');

      return;
    }

    if (isSubmitted) {
      return;
    }

    setIsSubmitting(true);
    try {
      const { saveScore } = await import('../services/config');
      await saveScore({
        name: playerName,
        quizId: quizId,
        quizTitle: quizTitle,
        score: result.score,
        percentage: result.percentage,
        correctAnswers: result.correctAnswers,
        wrongAnswers: result.wrongAnswers,
        totalQuestions: result.totalQuestions
      });

      // Reload leaderboard after submitting
      const response = await getLeaderboard(quizId, 10);
      if (response.success) {
        setLeaderboard(response.data);
      }

      setIsSubmitted(true);

      showMessage('🎉 Score submitted successfully!');
    } catch (error) {
      console.error('Error submitting score:', error);
      showMessage('Failed to submit score. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {message.show && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
          >
            <div
              className={`rounded-xl border shadow-lg px-6 py-3 text-sm font-semibold ${message.type === 'success'
                ? 'bg-green-100 border-green-300 text-green-800'
                : 'bg-red-100 border-red-300 text-red-800'
                }`}
            >
              {message.text}
            </div>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 mb-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Quiz Complete!
            </h2>
            <p className="text-lg text-gray-500 mb-4">{quizTitle}</p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm sm:text-base ${performance.bg} ${performance.color}`}
            >
              <span>{performance.emoji}</span>
              <span>{performance.message}</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center"
            >
              <Trophy className="mx-auto mb-2 text-blue-600" size={28} />
              <p className="text-3xl font-bold text-blue-900">{result.score} pts</p>
              <p className="text-sm text-blue-700 mt-1">Total Score</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center"
            >
              <Check className="mx-auto mb-2 text-green-600" size={28} />
              <p className="text-3xl font-bold text-green-900">{result.correctAnswers}</p>
              <p className="text-sm text-green-700 mt-1">Correct</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 text-center"
            >
              <X className="mx-auto mb-2 text-red-600" size={28} />
              <p className="text-3xl font-bold text-red-900">{result.wrongAnswers}</p>
              <p className="text-sm text-red-700 mt-1">Wrong</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center"
            >
              <TrendingUp className="mx-auto mb-2 text-purple-600" size={28} />
              <p className="text-3xl font-bold text-purple-900">{result.percentage}%</p>
              <p className="text-sm text-purple-700 mt-1">Accuracy</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Save Score Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="text-yellow-500" size={28} />
                <h3 className="text-2xl font-bold text-gray-900">Save Your Score</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitScore()}
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Score:</span>
                    <span className="font-semibold text-gray-900">{result.score} pts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="font-semibold text-gray-900">{result.percentage}%</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmitScore}
                  disabled={isSubmitting || isSubmitted}
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  <span>{isSubmitted ? 'Submitted!' : isSubmitting ? 'Submitting...' : 'Submit to Leaderboard'}</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Leaderboard Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="text-yellow-500" size={28} />
                <h3 className="text-2xl font-bold text-gray-900">Top 10 Leaderboard</h3>
              </div>

              <div className="h-[240px] overflow-y-auto pr-2">
                {isLoadingLeaderboard ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-16 rounded-xl bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse"
                      />
                    ))}
                  </div>
                ) : leaderboard.length === 0 ? (
                  <div className="text-center py-12">
                    <Trophy className="mx-auto mb-3 text-gray-300" size={48} />
                    <p className="text-gray-600 font-medium">No scores yet</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Be the first to complete this quiz!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {leaderboard.map((entry, index) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 ${index === 0
                            ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200'
                            : index === 1
                              ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
                              : index === 2
                                ? 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200'
                                : 'bg-white border-gray-200'
                          }`}
                      >
                        <div className="flex-shrink-0 w-8 text-center">
                          {index === 0 && <Trophy className="text-yellow-500" size={20} />}
                          {index === 1 && <Trophy className="text-gray-400" size={20} />}
                          {index === 2 && <Trophy className="text-orange-600" size={20} />}
                          {index > 2 && (
                            <span className="text-sm font-bold text-gray-500">
                              #{index + 1}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <User
                              className="text-gray-400 flex-shrink-0"
                              size={16}
                            />
                            <p className="font-semibold text-gray-900 truncate text-sm">
                              {entry.name || 'Anonymous'}
                            </p>
                          </div>
                        </div>

                        <div className="flex-shrink-0 text-right">
                          <p className="text-lg font-bold text-gray-900">
                            {entry.score}
                          </p>
                          <p className="text-xs text-gray-500">
                            {entry.percentage}%
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPlayAgain}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              <span>Play Again</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onHome}
              className="flex-1 py-4 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Home size={20} />
              <span>All Quizzes</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="text-center mt-2">
          <p className="text-sm text-gray-500">© 2026 QuizMaster • Built with React + Firebase</p>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;