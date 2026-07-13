# Quiz Player Application

A responsive **Quiz Player** application built with **React** (Vite), featuring smooth animations and a Firebase-powered leaderboard.

---

## Features

- **Quiz Listing**: Browse and filter quizzes by **category** and **difficulty**
- **Interactive Quiz Player**:
  - Countdown timer with visual progress
  - Smooth question transitions
  - Instant feedback with explanations
  - Progress tracking
- **Result Screen**: Detailed performance analytics with animations
- **Firebase Leaderboard**: Compete with others on the global leaderboard
- **Responsive UI**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Powered by **Framer Motion**

---

## Tech Stack

- **React.js** (Vite)
- **Tailwind CSS** (utility-first styling)
- **Firebase Firestore** (leaderboard data)
- **React Router DOM** (routing)
- **Framer Motion** (animations)
- **React Icons** / **Lucide React** (icons)

---

## Project Structure

```txt
src/
├── components/
│   ├── common/
│   │   └── SoundToggle.jsx
│   ├── layout/
│   │   ├── Layout.jsx
│   │   └── Navbar.jsx
│   ├── leaderboard/
│   │   ├── LeaderboardDashboardSkeleton.jsx
│   │   ├── LeaderboardListSkeleton.jsx
│   │   ├── LeaderboardSkeleton.jsx
│   │   └── (Leaderboard UI is in pages/)
│   └── quiz/
│       ├── OptionButton.jsx
│       ├── ProgressBar.jsx
│       ├── QuestionNav.jsx
│       ├── QuizCard.jsx
│       ├── QuizCardSkeleton.jsx
│       ├── QuizPlayerSkeleton.jsx
│       ├── Timer.jsx
│
├── pages/
│   ├── QuizList.jsx
│   ├── QuizPlayer.jsx
│   ├── ResultScreen.jsx
│   └── Leaderboard.jsx
│
├── services/
│   └── config.js (Firebase/leaderboard integrations)
│
├── utils/
│   ├── firebase.js
│   ├── quizData.js
│   └── soundManager.js
│
├── App.jsx
└── main.jsx
```

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm
- Firebase project (optional for leaderboard)

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

### Configure Firebase (optional)

Create a `.env` file in the project root and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Run the app

```bash
npm run dev
```

Open:

- http://localhost:5173

---

## Build for Production

```bash
npm run build
```

Preview:

```bash
npm run preview
```

---



---

## Features in Detail

### Quiz Listing

- Search quizzes by title/description
- Filter by **category** and **difficulty**
- Responsive grid layout
- Animated card hover effects

### Quiz Player

- Timer: circular progress indicator with warning color changes
- Progress bar: visual progress across the quiz
- Question navigation: sequential flow with navigation UI
- Auto-advance behavior when time expires
- Instant feedback: correct/incorrect + explanation
- Shuffled questions and options per attempt
- Progress persistence on refresh (attempt continuity)

### Result Screen

- Total score and accuracy percentage
- Correct/wrong answer counts
- Performance message based on results
- Navigation actions: play again, view leaderboard, or go home

### Leaderboard

- Top scores for each quiz
- Sorted by score (descending) with completion timestamp
- Rank badges (Gold/Silver/Bronze)
- Timestamp of completion
- Retry UI on error

---

## Bonus Features

- ✅ Shuffled questions and options
- ✅ Smooth animations throughout
- ✅ Responsive design (mobile-first)
- ✅ Loading and empty states
- ✅ Clean, modern UI with gradient accents

---


