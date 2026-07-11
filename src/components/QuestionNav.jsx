// QuestionNav.jsx
const QuestionNav = ({ total, currentIndex, answers, onJump }) => {
  const correctCount = Object.values(answers).filter(a => a.status === 'correct').length;
  const incorrectCount = Object.values(answers).filter(a => a.status === 'incorrect').length;
  const skippedCount = Object.values(answers).filter(a => a.status === 'skipped').length;
  const notAttemptedCount = total - Object.keys(answers).length;

  return (
    <div>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-4 gap-1.5 sm:gap-2">
        {Array.from({ length: total }).map((_, i) => {
          const isCurrent = i === currentIndex;
          const status = answers[i]?.status;
          const isClickable = status !== undefined || isCurrent;

          let classes = 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed';
          if (isCurrent) {
            classes = 'bg-orange-500 text-white border-orange-500';
          } else if (status === 'correct') {
            classes = 'bg-green-100 text-green-700 border-green-400 hover:bg-green-200 cursor-pointer';
          } else if (status === 'incorrect') {
            classes = 'bg-red-100 text-red-700 border-red-400 hover:bg-red-200 cursor-pointer';
          } else if (status === 'skipped') {
            classes = 'bg-yellow-100 text-yellow-700 border-yellow-400 hover:bg-yellow-200 cursor-pointer';
          }

          return (
            <button
              key={i}
              onClick={() => isClickable && onJump(i)}
              disabled={!isClickable}
              className={`h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-md text-xs sm:text-sm font-semibold border transition-colors ${classes}`}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          );
        })}
      </div>

      <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-200 space-y-1.5 sm:space-y-2">
        <div className="flex items-center justify-between gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-green-100 border border-green-400 inline-block"></span>
            Correct
          </div>
          <span className="font-semibold text-gray-800">{correctCount}</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-red-100 border border-red-400 inline-block"></span>
            Incorrect
          </div>
          <span className="font-semibold text-gray-800">{incorrectCount}</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-yellow-100 border border-yellow-400 inline-block"></span>
            Skipped (time up)
          </div>
          <span className="font-semibold text-gray-800">{skippedCount}</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-gray-100 border border-gray-300 inline-block"></span>
            Not attempted
          </div>
          <span className="font-semibold text-gray-800">{notAttemptedCount}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span className="h-4 w-4 rounded bg-orange-500 border border-orange-500 inline-block"></span>
          Current
        </div>
      </div>
    </div>
  );
};

export default QuestionNav;