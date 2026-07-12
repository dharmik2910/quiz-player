import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import Layout from './components/layout/Layout';
import QuizList from './pages/QuizList';
import QuizPlayer from './pages/QuizPlayer';
import ResultScreen from './pages/ResultScreen';
import Leaderboard from './pages/Leaderboard';
import { saveScore } from './services/config';
import { getQuizById, getQuizzes } from './utils/quizData';
import QuizPlayerSkeleton from './components/quiz/QuizPlayerSkeleton';
import LeaderboardSkeleton from './components/leaderboard/LeaderboardSkeleton';
import LeaderboardDashboardSkeleton from './components/leaderboard/LeaderboardDashboardSkeleton';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="quiz/:quizId" element={<QuizPlay />} />
        <Route path="result/:quizId" element={<QuizResult />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="leaderboard/:quizId" element={<QuizLeaderboard />} />
      </Route>
    </Routes>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Quiz Player';
  }, []);

  const handlePlayQuiz = (quiz) => {
    navigate(`/quiz/${quiz.id}`);
  };

  return <QuizList onPlayQuiz={handlePlayQuiz} />;
};

const QuizPlay = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const quiz = await getQuizById(quizId);
        setSelectedQuiz(quiz);
      } catch (error) {
        console.error('Error loading quiz:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuiz();
  }, [quizId]);

  useEffect(() => {
    document.title = selectedQuiz?.title
      ? `Quiz Player | ${selectedQuiz.title}`
      : 'Quiz Player';
  }, [selectedQuiz]);

  const handleComplete = (result) => {
    if (!selectedQuiz) return;

    const playerName = `Player_${Date.now().toString(36)}`;

    saveScore({
      name: playerName,
      quizId: selectedQuiz.id,
      quizTitle: selectedQuiz.title,
      score: result.score,
      percentage: result.percentage,
      correctAnswers: result.correctAnswers,
      wrongAnswers: result.wrongAnswers,
      totalQuestions: result.totalQuestions
    }).catch(error => {
      console.error('Failed to save score:', error);
    });

    navigate(`/result/${quizId}`, { state: { result } });
  };

const handleQuit = () => {
  if (window.confirm('Are you sure you want to quit? Your progress will be lost.')) {
    localStorage.removeItem(`quiz-progress-${selectedQuiz.id}`);
    navigate('/');
  }
};

  if (isLoading) {
    return <QuizPlayerSkeleton />;
  }

  if (!selectedQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Quiz not found</p>
          <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <QuizPlayer
      quiz={selectedQuiz}
      onComplete={handleComplete}
      onQuit={handleQuit}
    />
  );
};

const QuizResult = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const location = useLocation();
  const result = location.state?.result;
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const quizData = await getQuizById(quizId);
        setQuiz(quizData);
      } catch (error) {
        console.error('Error loading quiz:', error);
      }
    };
    loadQuiz();
  }, [quizId]);

  useEffect(() => {
    document.title = quiz?.title
      ? `Quiz Player | Results | ${quiz.title}`
      : 'Quiz Player';
  }, [quiz]);

  const handlePlayAgain = () => {
    navigate(`/quiz/${quizId}`);
  };

  const handleHome = () => {
    navigate('/');
  };

  if (!result) {
    navigate('/');
    return null;
  }

  return (
    <ResultScreen
      result={result}
      quizId={quizId}
      quizTitle={quiz?.title}
      onPlayAgain={handlePlayAgain}
      onHome={handleHome}
    />
  );
};

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error('Error loading quizzes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuizzes();
  }, []);

  useEffect(() => {
    document.title = 'Leaderboard';
  }, []);

  const handleViewLeaderboard = (quiz) => {
    navigate(`/leaderboard/${quiz.id}`);
  };

  if (isLoading) {
    return <LeaderboardSkeleton />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h1 className="flex items-center justify-center gap-2 sm:gap-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            <Trophy className="text-yellow-500 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />
            <span>Leaderboard</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Select a quiz to view the top scores and see how you rank against other players.
          </p>
        </motion.div>

        {quizzes.length === 0 ? (
          <div className="text-center py-20">
            <Trophy className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No quizzes available</h3>
            <p className="text-gray-500">Check back later for quizzes to compete on!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-md shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-700 border-green-200' :
                      quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                        'bg-red-100 text-red-700 border-red-200'
                      }`}>
                      {quiz.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      {quiz.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {quiz.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {quiz.description}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleViewLeaderboard(quiz)}
                    className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Trophy size={18} />
                    <span>View Leaderboard</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const QuizLeaderboard = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setError(null);
        const quizData = await getQuizById(quizId);
        setQuiz(quizData);
      } catch (error) {
        console.error('Error loading quiz:', error);
        setError('Failed to load quiz data');
      } finally {
        setIsLoading(false);
      }
    };
    loadQuiz();
  }, [quizId]);

  const handleHome = () => {
    navigate('/leaderboard');
  };

  if (isLoading) {
    return <LeaderboardDashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={handleHome} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Quiz not found</p>
          <button onClick={handleHome} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return <Leaderboard key={quizId} quiz={quiz} onHome={handleHome} />;
};

export default App;