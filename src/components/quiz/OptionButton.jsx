import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const OptionButton = ({ 
  option, 
  isSelected, 
  isCorrect, 
  isAnswered, 
  onClick, 
  disabled 
}) => {
  const getButtonStyles = () => {
    if (!isAnswered) {
      return isSelected
        ? 'bg-blue-50 border-blue-500 text-blue-700'
        : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50';
    }

    if (isCorrect) {
      return 'bg-green-50 border-green-500 text-green-700';
    }

    if (isSelected && !isCorrect) {
      return 'bg-red-50 border-red-500 text-red-700';
    }

    return 'bg-gray-50 border-gray-200 text-gray-500';
  };

  const getIcon = () => {
    if (!isAnswered) return null;
    if (isCorrect) return <Check className="w-5 h-5 text-green-600" />;
    if (isSelected && !isCorrect) return <X className="w-5 h-5 text-red-600" />;
    return null;
  };

  return (
    <motion.button
      whileHover={!disabled && !isAnswered ? { scale: 1.01 } : {}}
      whileTap={!disabled && !isAnswered ? { scale: 0.99 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full p-3 sm:p-4 rounded-xl border-2 text-left transition-all duration-200
        flex items-center justify-between gap-2 sm:gap-3
        ${getButtonStyles()}
        ${disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
      `}
    >
      <div className="flex items-center gap-2 sm:gap-3 flex-1">
        <div className={`
          w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0
          ${isSelected ? 'border-current' : 'border-gray-300'}
          ${isAnswered && isCorrect ? 'bg-green-100 border-green-500' : ''}
          ${isAnswered && isSelected && !isCorrect ? 'bg-red-100 border-red-500' : ''}
        `}>
          <span className="text-xs sm:text-sm font-semibold">
            {String.fromCharCode(65 + option.index)}
          </span>
        </div>
        <span className="font-medium text-sm sm:text-base">{option.text}</span>
      </div>
      {getIcon()}
    </motion.button>
  );
};

export default OptionButton;