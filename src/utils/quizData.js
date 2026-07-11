export const getQuizzes = async () => {
  try {
    const response = await fetch('/quiz.json');
    const data = await response.json();
    return data.quizzes || [];
  } catch (error) {
    console.error('Error loading quizzes:', error);
    return [];
  }
};

export const getQuizById = async (quizId) => {
  const quizzes = await getQuizzes();
  return quizzes.find(quiz => quiz.id === quizId);
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
