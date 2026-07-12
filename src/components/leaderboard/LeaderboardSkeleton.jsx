const LeaderboardSkeleton = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto py-10 px-4 animate-pulse">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          {/* <div className="w-10 h-10 rounded-full bg-gray-200 mx-auto mb-4"></div> */}

          <div className="h-10 w-76 bg-gray-200 rounded mx-auto mb-4"></div>

          <div className="h-5 w-[650px] max-w-full bg-gray-200 rounded mx-auto"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-md shadow-lg p-6 border border-gray-100"
            >
              {/* Badges */}
              <div className="flex justify-between mb-6">
                <div className="h-6 w-16 rounded-full bg-gray-200"></div>
                <div className="h-6 w-28 rounded-full bg-gray-200"></div>
              </div>

              {/* Title */}
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>

              {/* Description */}
              <div className="space-y-2 mb-6">
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>

              {/* Button */}
              <div className="h-10 rounded-xl bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardSkeleton;