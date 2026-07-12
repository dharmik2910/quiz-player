import { motion } from "framer-motion";

const SkeletonRow = () => (
  <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 bg-white">
    {/* Rank Icon */}
    <div className="flex-shrink-0 w-12 text-center">
      <div className="w-8 h-8 rounded-full bg-gray-200 mx-auto" />
    </div>

    {/* Name + Date */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-4 h-4 rounded-full bg-gray-200 flex-shrink-0" />
        <div className="h-5 w-44 rounded bg-gray-200" />
      </div>
      <div className="h-4 w-32 rounded bg-gray-200" />
    </div>

    {/* Score */}
    <div className="flex-shrink-0 text-right">
      <div className="h-8 w-12 rounded bg-gray-200 ml-auto" />
      <div className="h-4 w-10 rounded bg-gray-200 ml-auto mt-1" />
    </div>
  </div>
);

const LeaderboardDashboardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.8,
      }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">

          <div className="h-12 w-76 rounded bg-gray-200 mx-auto mb-4" />

          <div className="h-5 w-64 rounded bg-gray-200 mx-auto" />
        </div>

        {/* Leaderboard List */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>

        {/* Back Button */}
        <div className="h-12 bg-gray-200 rounded-xl mt-6" />
      </div>
    </motion.div>
  );
};

export default LeaderboardDashboardSkeleton;