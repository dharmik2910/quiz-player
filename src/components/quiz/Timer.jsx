import { motion, AnimatePresence } from 'framer-motion';

const Timer = ({ timeLeft, totalTime }) => {
  const percentage = (timeLeft / totalTime) * 100;

  const getTimerColor = () => {
    if (percentage > 50) return 'text-green-600';
    if (percentage > 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = () => {
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-16 h-16 transform -rotate-90">
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-gray-200"
        />
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          className={getProgressColor()}
          initial={{ pathLength: 1 }}
          animate={{ pathLength: percentage / 100 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            strokeDasharray: '175.93',
            strokeDashoffset: '0'
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={timeLeft}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`text-base font-bold ${getTimerColor()}`}
          >
            {timeLeft}s
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Timer;