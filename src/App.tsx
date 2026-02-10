import { useQuiz } from './hooks/useQuiz';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';

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

  if (state.section === null) {
    return <HomeScreen onSelectSection={startQuiz} />;
  }

  return (
    <QuizScreen
      state={state}
      currentQuestion={currentQuestion}
      estimatedScore={estimatedScore}
      scoreLabel={scoreLabel}
      submitAnswer={submitAnswer}
      nextQuestion={nextQuestion}
      onBack={resetQuiz}
    />
  );
}

export default App;
