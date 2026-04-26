import { useState } from "react"
import useEngine from "./engine/useEngine"
import problems from "./modules/derivatives/problems"

function App() {
  const {
    currentProblem,
    currentStep,
    stepIndex,
    score,
    feedback,
    isComplete,
    submitAnswer,
    dismissFeedback
  } = useEngine(problems)

  const [inputValue, setInputValue] = useState("")

  function handleSubmit() {
    if (!inputValue.trim()) return
    submitAnswer(inputValue)
    setInputValue("")
  }

  if (isComplete) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>You finished! 🎉</h1>
        <p>Final score: {score}</p>
      </div>
    )
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>

      {/* Score */}
      <p className="text-3x1 font-bold text-blue-500">Score: {score}</p>

      {/* Problem */}
      <h2>{currentProblem.question}</h2>
      <p>Step {stepIndex + 1} of {currentProblem.steps.length}</p>

      {/* Current Step */}
      <p>{currentStep.prompt}</p>

      {/* Input */}
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSubmit()}
        placeholder="Your answer..."
      />
      <button onClick={handleSubmit}>Submit</button>

      {/* Feedback */}
      {feedback === "correct" && (
        <p style={{ color: "green" }}>Correct! +10 points</p>
      )}
      {feedback === "incorrect" && (
        <div>
          <p style={{ color: "red" }}>Incorrect. -5 points</p>
          <p>Hint: {currentStep.hint}</p>
          <button onClick={dismissFeedback}>Try again</button>
        </div>
      )}

    </div>
  )
}

export default App
