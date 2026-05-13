import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import useEngine from "./engine/useEngine"
import problems from "./modules/derivatives/problems"
import ScoreBar from "./components/ScoreBar"
import QuestionDisplay from "./components/QuestionDisplay"
import AnswerInput from "./components/AnswerInput"
import MathBackground from "./components/MathBackground"
import MenuScreen from "./components/MenuScreen"
import PracticeResultScreen from "./components/PracticeResultScreen"

function App() {
  const [screen, setScreen] = useState("menu")
  const [inputValue, setInputValue] = useState("")
  const [scoreDelta, setScoreDelta] = useState(null)

  const {
    currentProblem,
    currentStep,
    stepIndex,
    score,
    feedback,
    isComplete,
    attemptCount,
    wrongProblems,
    isPracticeMode,
    submitAnswer,
    dismissFeedback,
    resetGame,
    returnToMenu,
    startNormalMode,
    startPracticeMode
  } = useEngine(problems)

  useEffect(() => {
    if (!isComplete || screen !== "game") return
    if (isComplete === "complete") setScreen("complete")
    else if (isComplete === "clean") setScreen("practiceCleared")
    else if (isComplete === "retry") setScreen("retry")
    else if (isComplete === "cooldown") setScreen("cooldown")
  }, [isComplete])

  const practiceIndex = Array.isArray(wrongProblems)
    ? wrongProblems.findIndex(p => p.id === currentProblem?.id)
    : 0

  function handleSubmit() {
    if (!inputValue.trim()) return
    if (!currentStep) return
    const correct =
      inputValue.trim().toLowerCase() ===
      currentStep.answer.trim().toLowerCase()
    const newAttemptCount = attemptCount + 1
    const deduction = newAttemptCount === 1 ? 5
      : newAttemptCount === 2 ? 10
      : 15
    setScoreDelta(correct ? 10 : -deduction)
    setTimeout(() => setScoreDelta(null), 1000)
    submitAnswer(inputValue)
    if (correct) setInputValue("")
  }

  function handleSelectNormal() {
    startNormalMode()
    setScreen("game")
  }

  function handleSelectPractice() {
    startPracticeMode()
    setScreen("game")
  }

  function handleReturnToMenu() {
    returnToMenu()
    setScreen("menu")
  }

  function retryPractice() {
    setInputValue("")
    startPracticeMode()
    setScreen("game")
  }

  if (screen === "menu") {
    return (
      <MenuScreen
        onSelectNormal={handleSelectNormal}
        onSelectPractice={handleSelectPractice}
        wrongProblemsCount={Array.isArray(wrongProblems) ? wrongProblems.length : 0}
      />
    )
  }

  if (screen === "retry") {
    return (
      <PracticeResultScreen
        score={score}
        onRetry={retryPractice}
        onMenu={handleReturnToMenu}
      />
    )
  }

  if (screen === "complete") {
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
        <MathBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "680px",
            borderRadius: "24px",
            padding: "60px 46px",
            background: "rgba(30, 41, 59, 0.5)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
            textAlign: "center"
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
            style={{ fontSize: "4rem", marginBottom: "16px" }}
          >
            ⚔️
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#F2F0EF",
              marginBottom: "8px"
            }}
          >
            Victory!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              fontSize: "1rem",
              color: "#777777",
              marginBottom: "40px"
            }}
          >
            All problems conquered
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              display: "inline-block",
              background: "rgba(59, 130, 246, 0.15)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "16px",
              padding: "20px 48px",
              marginBottom: "48px"
            }}
          >
            <p style={{
              fontSize: "0.85rem",
              color: "#777777",
              margin: "0 0 4px 0"
            }}>
              Final Score
            </p>
            <p style={{
              fontSize: "3rem",
              fontWeight: "700",
              color: "#FACC15",
              margin: 0,
              fontFamily: "'Fira Code', monospace"
            }}>
              {score}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{ display: "flex", gap: "16px", justifyContent: "center" }}
          >
            <button
              onClick={handleReturnToMenu}
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
                padding: "12px 32px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.08)"}
            >
              Menu
            </button>
            <button
              onClick={handleSelectNormal}
              style={{
                background: "#3B82F6",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "12px 32px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseEnter={e => e.target.style.background = "#60A5FA"}
              onMouseLeave={e => e.target.style.background = "#3B82F6"}
            >
              Play Again
            </button>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  if (screen === "practiceCleared") {
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
      <MathBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "480px",
          borderRadius: "24px",
          padding: "48px 40px",
          background: "rgba(30, 41, 59, 0.5)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(34, 197, 94, 0.3)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
          textAlign: "center"
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
          style={{ fontSize: "3.5rem", marginBottom: "16px" }}
        >
          ✅
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            color: "#22C55E",
            marginBottom: "8px"
          }}
        >
          {Array.isArray(wrongProblems) && wrongProblems.length === 0
            ? "Queue Cleared!"
            : "Problem Cleared!"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            fontSize: "0.95rem",
            color: "#777777",
            marginBottom: "32px",
            lineHeight: 1.6
          }}
        >
          {Array.isArray(wrongProblems) && wrongProblems.length === 0
            ? "All caught up! Your practice queue is empty."
            : `${wrongProblems.length} problem${wrongProblems.length > 1 ? "s" : ""} remaining in queue.`}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.2)",
            borderRadius: "12px",
            padding: "12px 24px",
            marginBottom: "32px",
            display: "inline-block"
          }}
        >
          <p style={{
            fontSize: "0.8rem",
            color: "#777777",
            margin: "0 0 4px 0"
          }}>Score</p>
          <p style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#FACC15",
            margin: 0,
            fontFamily: "'Fira Code', monospace"
          }}>
            {score}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center"
          }}
        >
          <button
            onClick={handleReturnToMenu}
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "12px",
              padding: "12px 28px",
              fontSize: "0.95rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.15)"}
            onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.08)"}
          >
            Menu
          </button>

          {Array.isArray(wrongProblems) && wrongProblems.length > 0 && (
            <button
              onClick={handleSelectPractice}
              style={{
                background: "#22C55E",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "12px 28px",
                fontSize: "0.95rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseEnter={e => e.target.style.background = "#16A34A"}
              onMouseLeave={e => e.target.style.background = "#22C55E"}
            >
              Next Problem
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

   // After all screen checks, before the game screen return
if (!currentProblem || !currentStep) {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "#0F172A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <MathBackground />
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
      <MathBackground />
      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "680px",
          borderRadius: "24px",
          padding: "46px",
          background: "rgba(30, 41, 59, 0.5)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
        }}
      >
        <ScoreBar
          score={score}
          problemIndex={isPracticeMode
            ? practiceIndex
            : problems.findIndex(p => p.id === currentProblem.id)}
          stepIndex={stepIndex}
          totalSteps={currentProblem.steps.length}
          scoreDelta={scoreDelta}
          isPracticeMode={isPracticeMode}
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