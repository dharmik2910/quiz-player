const QuizPlayerSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse">
      <div className="px-4 py-4">

        <div className="max-w-4xl mx-auto mb-5">
          <div className="h-7 w-64 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="h-4 w-20 bg-gray-200 rounded mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4">

          <div className="w-full md:w-60 bg-white rounded-md shadow-xl p-4">
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-9 rounded bg-gray-200"
                />
              ))}
            </div>
          </div>

          <div className="flex-1 bg-white rounded-md shadow-xl p-5">

            <div className="flex justify-between mb-6">
              <div className="h-3 flex-1 bg-gray-200 rounded mr-4"></div>
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="h-7 bg-gray-200 rounded"></div>
              <div className="h-7 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-5 w-24 bg-gray-200 rounded-full"></div>
            </div>

            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-14 bg-gray-200 rounded-xl"
                />
              ))}
            </div>

            <div className="h-12 bg-gray-200 rounded-xl mt-6"></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPlayerSkeleton;