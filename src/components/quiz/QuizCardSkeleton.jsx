import { motion } from "framer-motion";

const QuizCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.8,
      }}
      className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6"
    >
      {/* Top badges */}
      <div className="flex justify-between mb-4 sm:mb-5">
        <div className="h-4 sm:h-6 w-12 sm:w-16 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-4 sm:h-6 w-20 sm:w-28 rounded-full bg-gray-200 animate-pulse" />
      </div>

      {/* Title */}
      <div className="space-y-2 mb-3 sm:mb-4">
        <div className="h-4 sm:h-6 lg:h-7 w-full rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Description */}
      <div className="h-2.5 sm:h-4 w-2/3 rounded bg-gray-200 animate-pulse mb-4 sm:mb-6" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-4 sm:gap-x-6 mb-4 sm:mb-6">
        <div className="h-3 sm:h-5 w-20 sm:w-24 rounded bg-gray-200 animate-pulse" />
        <div className="h-3 sm:h-5 w-20 sm:w-24 rounded bg-gray-200 animate-pulse" />

        <div className="h-3 sm:h-5 w-16 sm:w-20 rounded bg-gray-200 animate-pulse" />
        <div className="h-3 sm:h-5 w-24 sm:w-28 rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Button */}
      <div className="h-10 sm:h-11 lg:h-12 w-full rounded-lg sm:rounded-xl bg-gray-200 animate-pulse" />
    </motion.div>
  );
};

export default QuizCardSkeleton;