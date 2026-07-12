import { motion } from 'framer-motion';
import { Clock, List, BarChart3, Tag } from 'lucide-react';

const difficultyColors = {
  Easy: 'bg-green-100 text-green-700 border-green-200',
  Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Hard: 'bg-red-100 text-red-700 border-red-200'
};

const QuizCard = ({ quiz, onPlay, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-md shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${difficultyColors[quiz.difficulty] || 'bg-gray-100 text-gray-700'}`}>
            {quiz.difficulty}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            {quiz.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {quiz.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {quiz.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <List className="text-blue-500 flex-shrink-0" />
            <span>{quiz.totalQuestions} Questions</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="text-purple-500 flex-shrink-0" />
            <span>{quiz.timePerQuestion}s per Q</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BarChart3 className="text-green-500 flex-shrink-0" />
            <span>{quiz.difficulty}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Tag className="text-orange-500 flex-shrink-0" />
            <span className="truncate">{quiz.category}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onPlay(quiz)}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Play Quiz
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuizCard;