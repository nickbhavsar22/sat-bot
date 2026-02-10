# SAT Bot — Implementation Plan

## Overview

**SAT Bot** is a web-based SAT/PSAT practice application that presents real, publicly available questions in a fun, engaging interface. Users choose between **Verbal (Reading & Writing)** and **Math** sections, answer multiple-choice questions, track their streak, and get a running SAT score estimate — all in a single session.

---

## Architecture Decision

**Stack: Single-page React app (Vite + React + TypeScript + Tailwind CSS)**

| Decision | Rationale |
|----------|-----------|
| React + Vite | Fast dev server, hot reload, modern tooling, easy deployment |
| TypeScript | Type safety for question data structures, score calculations |
| Tailwind CSS | Rapid styling, easy theming, responsive out of the box |
| Local JSON question bank | No backend needed — questions ship with the app |
| LocalStorage | Persist session stats without a server |

No backend is needed for v1. Questions are bundled as JSON. All logic runs client-side.

---

## Question Data Source

**Primary source: College Board SAT Suite Question Bank + OpenSAT API**

### Strategy
1. **Curate a local JSON question bank** with 50+ Verbal and 50+ Math questions sourced from:
   - College Board's publicly released practice test PDFs (tests 4–10)
   - The OpenSAT open-source project API (`https://pinesat.com/api/questions`)
   - College Board's Question of the Day archive
2. Each question includes: the prompt, passage (if applicable), 4 answer choices (A/B/C/D), the correct answer, a detailed explanation, difficulty level (easy/medium/hard), and category/domain tags.
3. Math "grid-in" (student-produced response) questions will be adapted to multiple-choice format for consistency in v1.

### Question JSON Schema
```json
{
  "id": "verbal-001",
  "section": "verbal",           // "verbal" | "math"
  "domain": "Craft and Structure",
  "skill": "Words in Context",
  "difficulty": "medium",         // "easy" | "medium" | "hard"
  "passage": "Short passage text here (if applicable)...",
  "question": "Which choice best completes the text?",
  "choices": {
    "A": "First option",
    "B": "Second option",
    "C": "Third option",
    "D": "Fourth option"
  },
  "correctAnswer": "B",
  "explanation": "Detailed explanation of why B is correct and why the other options are wrong..."
}
```

---

## Application Screens & Flow

### Screen 1: Home / Section Selector
- App title & branding ("SAT Bot" with a fun mascot/logo)
- Two large cards to choose: **Verbal** or **Math**
- Brief description under each card (question count, what to expect)
- Session stats summary if returning (from localStorage)

### Screen 2: Quiz Interface (core loop)
- **Top bar**: Section label, streak counter (fire icon + number), session score (e.g., "14/20 correct")
- **Score estimate badge**: Running SAT score estimate for this section (e.g., "~680 / 800")
- **Question card**:
  - Domain/skill tag (e.g., "Algebra" or "Craft & Structure")
  - Difficulty indicator (color-coded: green/yellow/red)
  - Passage block (if verbal, styled as a quote/excerpt)
  - Question text
  - Four answer buttons (A, B, C, D) — large, tappable, clear
- **Answer flow**:
  - User selects an answer
  - **Correct**: Green flash animation, streak increments, brief "Correct!" toast, auto-advance to next question after 1.5s
  - **Incorrect**: Red flash on selected answer, green highlight on correct answer, streak resets to 0, **explanation panel slides in**

### Screen 3: Explanation Panel (inline, not a separate page)
- Appears below or overlaying the question when the user answers incorrectly
- Shows:
  - "The correct answer is **B**"
  - Full explanation of why the correct answer is right
  - Brief note on why the selected (wrong) answer is incorrect
  - "Continue" button to advance to next question

### Persistent UI Elements
- **Streak counter**: Consecutive correct answers (with fire/lightning animation at milestones like 5, 10, 20)
- **Session stats bar**: Correct / Total answered, percentage
- **SAT Score Estimate**: Dynamically calculated, displayed prominently
- **Section switcher**: Ability to switch between Verbal and Math at any time (with confirmation if mid-quiz)
- **Progress indicator**: How many questions answered in this session

---

## SAT Score Estimation Algorithm

### How the Real SAT Scoring Works
- Each section (Reading & Writing, Math) is scored **200–800**
- The Digital SAT uses adaptive modules, but for our estimate we'll use a simplified model based on accuracy percentage mapped to score ranges

### Our Estimation Model

```
Score = 200 + (accuracy_percentage × 600)
```

With adjustments for difficulty weighting:
- Easy questions correct: +1.0 weight
- Medium questions correct: +1.2 weight
- Hard questions correct: +1.5 weight
- Minimum 5 questions answered before showing an estimate (show "Answer more questions..." before that)

### Score brackets for display context:
| Accuracy | Estimated Score | Label |
|----------|----------------|-------|
| 90-100%  | 720-800        | "Exceptional" |
| 80-89%   | 640-720        | "Strong" |
| 70-79%   | 560-640        | "Solid" |
| 60-69%   | 480-560        | "Building" |
| Below 60%| 200-480        | "Keep Practicing" |

---

## Design & Theme

### Visual Identity
- **Theme**: Modern, encouraging, slightly playful — think "Duolingo meets College Board"
- **Color palette**:
  - Primary: Deep indigo/purple (`#4F46E5`) — trust, intelligence
  - Accent: Vibrant amber/gold (`#F59E0B`) — achievement, energy
  - Success: Emerald green (`#10B981`)
  - Error: Rose red (`#F43F5E`)
  - Background: Soft off-white with subtle gradient
  - Cards: White with soft shadows
- **Typography**: Clean sans-serif (Inter or system font stack), generous spacing
- **Animations**: Subtle but rewarding — confetti on milestones, shake on wrong answers, smooth transitions
- **Responsive**: Mobile-first, works great on phone, tablet, and desktop

### Fun Elements
- Streak fire animation that grows with consecutive correct answers
- Milestone celebrations (confetti at 5, 10, 25 streak)
- Score estimate gauge/meter that visually fills
- Encouraging messages that rotate ("You're on fire!", "Keep it up!", "SAT ready!")
- Sound effects (optional, toggleable) for correct/incorrect

---

## File Structure

```
SAT-bot/
├── CLAUDE.md                  # Project instructions
├── workflows/
│   └── implementation-plan.md # This plan
├── index.html                 # Entry point
├── package.json               # Dependencies
├── vite.config.ts             # Vite config
├── tailwind.config.js         # Tailwind config
├── tsconfig.json              # TypeScript config
├── postcss.config.js          # PostCSS for Tailwind
├── public/
│   └── favicon.svg            # App icon
├── src/
│   ├── main.tsx               # React entry
│   ├── App.tsx                # Root component + routing
│   ├── index.css              # Tailwind imports + global styles
│   ├── components/
│   │   ├── HomeScreen.tsx     # Section selector landing page
│   │   ├── QuizScreen.tsx     # Main quiz interface
│   │   ├── QuestionCard.tsx   # Individual question display
│   │   ├── AnswerButton.tsx   # Styled answer choice button
│   │   ├── ExplanationPanel.tsx # Wrong answer explanation
│   │   ├── ScoreEstimate.tsx  # SAT score gauge/display
│   │   ├── StreakCounter.tsx  # Streak display with animations
│   │   ├── SessionStats.tsx   # Correct/total stats bar
│   │   ├── Header.tsx         # Top nav bar
│   │   └── Confetti.tsx       # Celebration animation
│   ├── data/
│   │   ├── verbal-questions.json  # Curated verbal question bank
│   │   └── math-questions.json    # Curated math question bank
│   ├── hooks/
│   │   ├── useQuiz.ts         # Quiz state management (current Q, streak, stats)
│   │   └── useScoreEstimate.ts # Score calculation logic
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces (Question, Session, etc.)
│   └── utils/
│       ├── scoring.ts         # Score estimation algorithm
│       ├── questionSelector.ts # Question selection/shuffle logic
│       └── storage.ts         # LocalStorage helpers
```

---

## Implementation Phases

### Phase 1: Project Scaffolding & Data
1. Initialize Vite + React + TypeScript project
2. Install and configure Tailwind CSS
3. Set up the file structure
4. Define TypeScript types/interfaces
5. Curate and create the question JSON files (minimum 50 verbal + 50 math)

### Phase 2: Core Quiz Engine
1. Build the `useQuiz` custom hook (state management for quiz flow)
2. Build `questionSelector.ts` (shuffling, avoiding repeats, difficulty mixing)
3. Build `scoring.ts` (SAT score estimation algorithm)
4. Build `storage.ts` (localStorage for session persistence)

### Phase 3: UI Components
1. `HomeScreen` — section selector with cards
2. `Header` — persistent top bar
3. `QuestionCard` — passage + question + choices layout
4. `AnswerButton` — interactive answer buttons with states (default, selected, correct, incorrect)
5. `ExplanationPanel` — detailed explanation slide-in
6. `StreakCounter` — streak display with fire animation
7. `ScoreEstimate` — gauge/badge showing estimated SAT score
8. `SessionStats` — correct/total with percentage
9. `Confetti` — celebration effect for milestones

### Phase 4: Integration & Polish
1. Wire all components together in `QuizScreen` and `App`
2. Add animations and transitions (Tailwind + CSS keyframes)
3. Add milestone celebrations (confetti at streak thresholds)
4. Add encouraging messages rotation
5. Responsive design pass (mobile, tablet, desktop)
6. LocalStorage session persistence

### Phase 5: Testing & Refinement
1. Manual testing of full quiz flow (both sections)
2. Verify score estimation produces reasonable numbers
3. Test edge cases (all correct, all wrong, section switching)
4. Cross-browser testing
5. Final design polish

---

## Key Technical Details

### Question Selection Logic
- Shuffle questions on section start
- Mix difficulties: ~30% easy, 50% medium, 20% hard (mirrors real SAT distribution)
- Never repeat a question within a session
- When all questions exhausted, reshuffle and notify user

### State Management (useQuiz hook)
```typescript
interface QuizState {
  section: 'verbal' | 'math' | null;
  currentQuestionIndex: number;
  questions: Question[];          // shuffled for this session
  streak: number;                 // consecutive correct
  bestStreak: number;             // best streak this session
  correctCount: number;
  totalAnswered: number;
  answeredQuestionIds: Set<string>;
  showExplanation: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  difficultyScores: { easy: number; medium: number; hard: number };
}
```

### Score Estimation Details
- Weighted accuracy = (easy_correct × 1.0 + medium_correct × 1.2 + hard_correct × 1.5) / (easy_total × 1.0 + medium_total × 1.2 + hard_total × 1.5)
- Estimated score = 200 + Math.round(weighted_accuracy × 600)
- Clamped to 200–800 range
- Only displayed after 5+ questions answered
- Updates in real-time after each answer

---

## Success Criteria

- [ ] User can select Verbal or Math from a visually appealing home screen
- [ ] Questions display in proper SAT format (passage + question + 4 choices)
- [ ] Correct answers trigger positive feedback and auto-advance
- [ ] Incorrect answers show detailed explanation before continuing
- [ ] Streak counter tracks consecutive correct answers with visual flair
- [ ] Session stats show correct/total/percentage at all times
- [ ] SAT score estimate updates dynamically and feels motivating
- [ ] Milestone celebrations (confetti) fire at streak thresholds
- [ ] App looks great on mobile and desktop
- [ ] 50+ questions per section provide meaningful practice
- [ ] Score estimation produces believable SAT score ranges
