import { motion } from "framer-motion";

const SkeletonQuizCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.8,
      }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      {/* Top badges */}
      <div className="flex justify-between mb-5">
        <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-6 w-28 rounded-full bg-gray-200 animate-pulse" />
      </div>

      {/* Title */}
      <div className="space-y-2 mb-4">
        <div className="h-7 w-full rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Description */}
      <div className="h-4 w-2/3 rounded bg-gray-200 animate-pulse mb-6" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6">
        <div className="h-5 w-24 rounded bg-gray-200 animate-pulse" />
        <div className="h-5 w-24 rounded bg-gray-200 animate-pulse" />

        <div className="h-5 w-20 rounded bg-gray-200 animate-pulse" />
        <div className="h-5 w-28 rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Button */}
      <div className="h-12 w-full rounded-xl bg-gray-200 animate-pulse" />
    </motion.div>
  );
};

export default SkeletonQuizCard;    