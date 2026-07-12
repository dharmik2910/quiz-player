import { motion } from 'framer-motion';

const ProgressBar = ({ current, total, showLabel = true }) => {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {current} of {total}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;