// QuizList.jsx
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import QuizCard from '../components/QuizCard';
import { getQuizzes } from '../utils/quizData';
import { Search, BookOpen, Filter } from 'lucide-react';
import SkeletonQuizCard from '../components/SkeletonQuizCard';

const QuizList = ({ onPlayQuiz }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
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

  const filteredQuizzes = useMemo(() => {
    let filtered = quizzes;

    if (searchTerm) {
      filtered = filtered.filter(quiz =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(quiz => quiz.category === selectedCategory);
    }

    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(quiz => quiz.difficulty === selectedDifficulty);
    }

    return filtered;
  }, [quizzes, searchTerm, selectedCategory, selectedDifficulty]);

  const categories = useMemo(() => ['All', ...new Set(quizzes.map(q => q.category))], [quizzes]);
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

if (isLoading) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header Skeleton */}
        <div className="text-center mb-8">
          <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 w-96 max-w-full bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>

        {/* Search Skeleton */}
        <div className="bg-white rounded-md shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-full lg:w-52 h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-full lg:w-40 h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Quiz Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonQuizCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8 lg:mb-12"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <BookOpen className="text-3xl sm:text-4xl text-blue-600" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Quiz Player
            </h1>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Challenge yourself with our collection of quizzes. Test your knowledge across various categories and difficulty levels.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-md shadow-lg p-4 sm:p-5 lg:p-6 mb-6 sm:mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex gap-2 sm:gap-3">
              <div className="relative flex-1 lg:flex-none">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-6 sm:pr-8 py-2.5 sm:py-3 text-xs sm:text-sm lg:text-base border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none appearance-none bg-white cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
                  ))}
                </select>
              </div>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="flex-1 lg:flex-none px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm lg:text-base border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none appearance-none bg-white cursor-pointer"
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff === 'All' ? 'All Levels' : diff}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {filteredQuizzes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16 lg:py-20"
          >
            <Search className="text-5xl sm:text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">No quizzes found</h3>
            <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {filteredQuizzes.map((quiz, index) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onPlay={onPlayQuiz}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizList;