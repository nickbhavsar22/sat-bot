import { useQuiz } from './hooks/useQuiz';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import PasswordGate from './components/PasswordGate';

function App() {
  const {
    state,
    startQuiz,
    submitAnswer,
    nextQuestion,
    resetQuiz,
    currentQuestion,
    estimatedScore,
    scoreLabel,
  } = useQuiz();

  return (
    <PasswordGate>
      {state.section === null ? (
        <HomeScreen onSelectSection={startQuiz} />
      ) : (
        <QuizScreen
          state={state}
          currentQuestion={currentQuestion}
          estimatedScore={estimatedScore}
          scoreLabel={scoreLabel}
          submitAnswer={submitAnswer}
          nextQuestion={nextQuestion}
          onBack={resetQuiz}
        />
      )}
    </PasswordGate>
  );
}

export default App;
