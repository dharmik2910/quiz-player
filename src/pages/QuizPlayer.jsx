// QuizPlayer.jsx
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Timer from '../components/Timer';
import ProgressBar from '../components/ProgressBar';
import OptionButton from '../components/OptionButton';
import { shuffleArray } from '../utils/quizData';
import { ArrowRight } from 'lucide-react';
import QuestionNav from '../components/QuestionNav';
import soundManager, { SOUNDS } from '../utils/soundManager';
import QuizPlayerSkeleton from '../components/QuizPlayerSkeleton';

const QuizPlayer = ({ quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quiz.timePerQuestion);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timeWarning, setTimeWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use refs to track current values for callbacks
  const scoreRef = useRef(score);
  const correctAnswersRef = useRef(correctAnswers);
  const wrongAnswersRef = useRef(wrongAnswers);
  
  // Update refs when state changes
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { correctAnswersRef.current = correctAnswers; }, [correctAnswers]);
  useEffect(() => { wrongAnswersRef.current = wrongAnswers; }, [wrongAnswers]);

  const questions = useMemo(() => {
    return shuffleArray([...quiz.questions]).map(q => ({
      ...q,
      shuffledOptions: shuffleArray(
        q.options.map((text, index) => ({ text, index }))
      )
    }));
  }, [quiz]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true);
      setWrongAnswers(prev => prev + 1);
      setAnswers(prev => ({ ...prev, [currentQuestionIndex]: { status: 'skipped', option: null } }));
      soundManager.play(SOUNDS.TIME_UP);

      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          soundManager.play(SOUNDS.TRANSITION);
          setDirection(1);
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedOption(null);
          setIsAnswered(false);
          setTimeLeft(quiz.timePerQuestion);
          setTimeWarning(false);
        } else {
          soundManager.play(SOUNDS.COMPLETE);
          // Use refs to get current state values
          onComplete({
            score: scoreRef.current,
            correctAnswers: correctAnswersRef.current,
            wrongAnswers: wrongAnswersRef.current,
            totalQuestions: questions.length,
            percentage: Math.round((correctAnswersRef.current / questions.length) * 100)
          });
        }
      }, 1500);
    }
  }, [isAnswered, currentQuestionIndex, questions.length, quiz.timePerQuestion, onComplete]);

  const handleOptionSelect = useCallback((option) => {
    if (isAnswered) return;

    soundManager.play(SOUNDS.CLICK);
    setSelectedOption(option);
    setIsAnswered(true);

    if (option.text === currentQuestion.correctAnswer) {
      setScore(prev => prev + currentQuestion.points);
      setCorrectAnswers(prev => prev + 1);
      setAnswers(prev => ({ ...prev, [currentQuestionIndex]: { status: 'correct', option } }));
      soundManager.play(SOUNDS.CORRECT);
    } else {
      setWrongAnswers(prev => prev + 1);
      setAnswers(prev => ({ ...prev, [currentQuestionIndex]: { status: 'incorrect', option } }));
      soundManager.play(SOUNDS.WRONG);
    }
  }, [isAnswered, currentQuestion, currentQuestionIndex]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      soundManager.play(SOUNDS.TRANSITION);
      setDirection(1);
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(quiz.timePerQuestion);
      setTimeWarning(false);
    } else {
      soundManager.play(SOUNDS.COMPLETE);
      // Use refs to get current state values
      onComplete({
        score: scoreRef.current,
        correctAnswers: correctAnswersRef.current,
        wrongAnswers: wrongAnswersRef.current,
        totalQuestions: questions.length,
        percentage: Math.round((correctAnswersRef.current / questions.length) * 100)
      });
    }
  }, [currentQuestionIndex, questions.length, quiz.timePerQuestion, onComplete]);

  const handleJump = useCallback((index) => {
    if (!(index in answers) && index !== currentQuestionIndex) return;
    setDirection(index > currentQuestionIndex ? 1 : -1);
    setCurrentQuestionIndex(index);

    const recorded = answers[index];
    if (recorded) {
      setSelectedOption(recorded.option);
      setIsAnswered(true);
    } else {
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(quiz.timePerQuestion);
    }
  }, [currentQuestionIndex, quiz.timePerQuestion, answers]);

useEffect(() => {
  setIsLoading(true);

  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 600); // adjust time if needed

  return () => clearTimeout(timer);
}, [quiz]);

  useEffect(() => {
    if (!currentQuestion || isAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        
        // Play warning tick when time is running low (last 5 seconds)
        if (prev <= 5 && prev > 0 && !timeWarning) {
          soundManager.play(SOUNDS.TICK);
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, isAnswered, handleTimeUp, timeWarning]);

if (isLoading) {
  return <QuizPlayerSkeleton />;
}

  return (
    <div className="min-h-screen md:overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col overflow-y-auto md:overflow-hidden">
      <div className="flex-shrink-0 px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">{quiz.title}</h2>
            <p className="text-xs sm:text-sm text-gray-600">Score: {score}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-start justify-start md:justify-center gap-3 md:gap-4 lg:gap-6 px-3 sm:px-6 lg:px-8 py-1 overflow-y-auto md:overflow-hidden">
        <div className="w-full sm:max-w-md md:w-56 lg:w-64 mx-auto md:mx-0 bg-white rounded-md shadow-xl p-3 mt-1 order-2 md:order-1 flex-shrink-0">
          <QuestionNav
            total={questions.length}
            currentIndex={currentQuestionIndex}
            answers={answers}
            onJump={handleJump}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-md shadow-xl p-3 sm:p-4 lg:p-5 w-full max-w-4xl order-1 md:order-2 pb-6 md:pb-8"
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex-1 min-w-0">
              <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
            </div>
            <div className="flex-shrink-0">
              <Timer timeLeft={timeLeft} totalTime={quiz.timePerQuestion} />
            </div>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestionIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              <div className="mb-3">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1.5">
                  {currentQuestionIndex + 1}. {currentQuestion.question}
                </h3>
                {currentQuestion.points > 0 && (
                  <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    {currentQuestion.points} points
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-3 flex-1">
                {currentQuestion.shuffledOptions.map((option, index) => (
                  <OptionButton
                    key={index}
                    option={{ ...option, index }}
                    isSelected={selectedOption?.text === option.text}
                    isCorrect={option.text === currentQuestion.correctAnswer}
                    isAnswered={isAnswered}
                    onClick={() => handleOptionSelect(option)}
                    disabled={isAnswered}
                  />
                ))}
              </div>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3 p-3 rounded-xl bg-blue-50 border border-blue-200"
                >
                  <p className="text-sm font-medium text-blue-900 mb-0.5">Explanation:</p>
                  <p className="text-blue-700 text-sm">{currentQuestion.explanation}</p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                disabled={!isAnswered}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <span>{currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPlayer;