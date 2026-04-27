import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useEngine from "./engine/useEngine"
import problems from "./modules/derivatives/problems"
import ScoreBar from "./components/ScoreBar"
import QuestionDisplay from "./components/QuestionDisplay"
import AnswerInput from "./components/AnswerInput"
import MathBackground from "./components/MathBackground"

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
  const [scoreDelta, setScoreDelta] = useState(null)

  function handleSubmit() {
    if (!inputValue.trim()) return

    const correct =
      inputValue.trim().toLowerCase() ===
      currentStep.answer.trim().toLowerCase()

    setScoreDelta(correct ? 10 : -5)
    setTimeout(() => setScoreDelta(null), 1000)

    submitAnswer(inputValue)
    if (correct) setInputValue("")
  }

  if (isComplete) {
    return (
      <div style={{
        width: "100vw",
        height: "100vh",
        background: "#0F172A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ textAlign: "center", color: "white" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            You finished! 🎉
          </h1>
          <p style={{ fontSize: "1.25rem" }}>Final score: {score}</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "#0F172A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      position: "relative"
    }}>

      <MathBackground/>

      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          borderRadius: "24px",
          padding: "46px",
          background: "rgba(30,41,59,0.08)",
          backdropFilter: "blur(7px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
        }}
      >
        <ScoreBar
          score={score}
          problemIndex={problems.indexOf(currentProblem)}
          stepIndex={stepIndex}
          totalSteps={currentProblem.steps.length}
          scoreDelta={scoreDelta}
        />

        <QuestionDisplay
          question={currentProblem.question}
          prompt={currentStep.prompt}
        />

        <AnswerInput
          value={inputValue}
          onChange={setInputValue}
          feedback={feedback}
          hint={currentStep.hint}
          onSubmit={handleSubmit}
        />

        <div style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "24px"
        }}>
          <button
            onClick={handleSubmit}
            style={{
              background: "#3B82F6",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "10px 32px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseEnter={e => e.target.style.background = "#60A5FA"}
            onMouseLeave={e => e.target.style.background = "#3B82F6"}
          >
            Submit
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default App