# Quiz Player Application

A production-grade, responsive Quiz Player application built with React.js, featuring smooth animations, Firebase integration for leaderboards, and a modern UI/UX design.

## Features

- **Quiz Listing**: Browse and filter quizzes by category and difficulty
- **Interactive Quiz Player**: 
  - Countdown timer with visual progress
  - Smooth question transitions
  - Instant feedback with explanations
  - Progress tracking
- **Result Screen**: Detailed performance analytics with animations
- **Firebase Leaderboard**: Compete with others on the global leaderboard
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by Framer Motion for seamless transitions

## Tech Stack

- **React.js** (Vite) - Modern build tool and fast development
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Firebase Firestore** - Cloud database for leaderboard
- **React Router** - Navigation and routing
- **Framer Motion** - Animation library
- **React Icons** - Icon library

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── QuizCard.jsx    # Quiz card component
│   ├── Timer.jsx       # Countdown timer with circular progress
│   ├── ProgressBar.jsx # Linear progress indicator
│   └── OptionButton.jsx # Interactive option button
├── pages/              # Page components
│   ├── QuizList.jsx    # Quiz listing with filters
│   ├── QuizPlayer.jsx  # Main quiz interface
│   ├── ResultScreen.jsx # Results and analytics
│   └── Leaderboard.jsx # Firebase leaderboard
├── services/           # External services
│   └── firebaseService.js # Firebase operations
├── utils/              # Utility functions
│   ├── firebase.js     # Firebase configuration
│   └── quizData.js     # Quiz data management
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account (for leaderboard feature)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quiz-player
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase (optional, for leaderboard):
   - Create a `.env` file in the root directory
   - Add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Quiz Data Format

Quizzes are loaded from `public/quiz.json`. Each quiz should follow this structure:

```json
{
  "id": "unique-quiz-id",
  "title": "Quiz Title",
  "description": "Quiz description",
  "category": "Category Name",
  "difficulty": "Easy|Medium|Hard",
  "timePerQuestion": 15,
  "totalQuestions": 10,
  "questions": [
    {
      "id": "q1",
      "question": "Question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "points": 10,
      "explanation": "Explanation text"
    }
  ]
}
```

## Features in Detail

### Quiz Listing
- Search quizzes by title or description
- Filter by category and difficulty level
- Responsive grid layout (1-3 columns based on screen size)
- Animated card hover effects

### Quiz Player
- **Timer**: Circular progress indicator with color changes (green → yellow → red)
- **Progress Bar**: Visual progress through the quiz
- **Question Navigation**: Sequential, no going back
- **Auto-advance**: Automatically moves to next question when timer expires
- **Instant Feedback**: Shows correct/incorrect answer with explanation
- **Shuffled Questions & Options**: Random order for each attempt

### Result Screen
- Total score and accuracy percentage
- Correct/wrong answer count
- Performance message based on score
- Animated progress bar
- Options to play again, view leaderboard, or go home

### Leaderboard
- Top 10 scores for each quiz
- Sorted by score (descending) and completion time
- Rank badges (Gold, Silver, Bronze)
- Timestamp of completion
- Retry functionality on error

## Bonus Features

- ✅ Shuffled questions and options
- ✅ Smooth animations throughout
- ✅ Responsive design (mobile-first)
- ✅ Loading and empty states
- ✅ Clean, modern UI with gradient accents

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
