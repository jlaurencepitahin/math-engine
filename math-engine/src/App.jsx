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
import ExitConfirmPopup from "./components/ExitConfirmPopup"
import CooldownScreen from "./components/CooldownScreen"

function App() {
  const [screen, setScreen] = useState("menu")
  const [inputValue, setInputValue] = useState("")
  const [scoreDelta, setScoreDelta] = useState(null)
  const [showExitPopup, setShowExitPopup] = useState(false)

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
    cooldownEndTime,
    activePracticeProblems,
    clearCooldown,
    submitAnswer,
    returnToMenu,
    startNormalMode,
    startPracticeMode,
  } = useEngine(problems)

  useEffect(() => {
    if (!isComplete || screen !== "game") return
    if (isComplete === "complete") setScreen("complete")
    else if (isComplete === "clean") setScreen("practiceCleared")
    else if (isComplete === "retry") setScreen("retry")
    else if (isComplete === "cooldown") setScreen("cooldown")
  }, [isComplete, screen])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && screen === "game") {
        setShowExitPopup(prev => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [screen])

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

  function handleQuit() {
    setShowExitPopup(false)
    setInputValue("")
    returnToMenu()
    setScreen("menu")
  }

  if (screen === "menu") {
    return (
      <MenuScreen
        onSelectNormal={handleSelectNormal}
        onSelectPractice={handleSelectPractice}
        wrongProblemsCount={Array.isArray(wrongProblems) ? wrongProblems.length : 0}
        cooldownEndTime={cooldownEndTime}
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
    <div className="relative flex h-screen w-screen items-center justify-center bg-primary p-6">
      <MathBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-170 rounded-3xl border border-white/10 bg-[rgba(30,41,59,0.5)] p-6 shadow-2xl backdrop-blur-sm md:p-11.5"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
          className="mb-4 text-[4rem]"
        >
          ⚔️
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-2 text-[2.5rem] font-bold text-white"
        >
          Victory!
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-10 text-base text-grey"
        >
          All problems conquered
        </motion.p>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-12 inline-block rounded-2xl border border-blue-500/30 bg-blue-500/15 px-12 py-5"
        >
          <p className="mb-1 text-[0.85rem] text-grey">
            Final Score
          </p>

          <p className="font-['Fira_Code'] text-[3rem] font-bold text-yellow-400">
            {score}
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center gap-4"
        >
          <button
            onClick={() => setShowExitPopup(true)}
            className="fixed left-0 top-0 z-50 flex w-full cursor-pointer items-center gap-1.5 border-b border-white/10 bg-[rgba(15,23,42,0.8)] px-4 py-3 text-[0.85rem] font-semibold text-white/70 backdrop-blur-sm transition-all duration-200 hover:text-white md:left-5 md:top-5 md:w-auto md:rounded-[10px] md:border md:border-white/10 md:bg-white/5 md:px-4 md:py-2"
          >
            ← Menu
          </button>

          <button
            onClick={handleSelectNormal}
            className="cursor-pointer rounded-xl bg-blue-500 px-8 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-blue-400"
          >
            Play Again
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

  if (screen === "practiceCleared") {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-primary p-6">
      <MathBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-120 rounded-3xl border border-green-500/30 bg-[rgba(30,41,59,0.5)] px-10 py-12 text-center shadow-2xl backdrop-blur-xl"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
          className="mb-4 text-[3.5rem]"
        >
          ✅
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-2 text-[1.8rem] font-bold text-green-500"
        >
          {activePracticeProblems.length === 0
            ? "Queue Cleared!"
            : "Problem Cleared!"}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8 text-[0.95rem] leading-relaxed text-grey"
        >
          {activePracticeProblems.length === 0
            ? "All caught up! Your practice queue is empty."
            : `${activePracticeProblems.length} problem${
                activePracticeProblems.length > 1 ? "s" : ""
              } remaining in queue.`}
        </motion.p>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-8 inline-block rounded-xl border border-green-500/20 bg-green-500/10 px-6 py-3"
        >
          <p className="mb-1 text-[0.8rem] text-grey">
            Score
          </p>

          <p className="font-['Fira_Code'] text-[2rem] font-bold text-yellow-400">
            {score}
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center gap-3"
        >
          <button
            onClick={handleReturnToMenu}
            className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-7 py-3 text-[0.95rem] font-semibold text-white transition-colors duration-200 hover:bg-white/15"
          >
            Menu
          </button>

          {activePracticeProblems.length > 0 && (
            <button
              onClick={handleSelectPractice}
              className="cursor-pointer rounded-xl bg-green-500 px-7 py-3 text-[0.95rem] font-semibold text-white transition-colors duration-200 hover:bg-green-600"
            >
              Next Problem
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

if (screen === "cooldown") {
  return (
    <CooldownScreen
      cooldownEndTime={cooldownEndTime}
      onReturnToMenu={handleReturnToMenu}
      clearCooldown={clearCooldown}
    />
  );
}

  if (!currentProblem || !currentStep) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-primary">
      <MathBackground />
    </div>
  )
}

  return (
  <div className="relative flex min-h-screen w-screen items-start justify-center bg-primary p-4 py-8 md:items-center md:p-6">
    <MathBackground />

    {showExitPopup && (
      <ExitConfirmPopup
        score={score}
        isPracticeMode={isPracticeMode}
        onStay={() => setShowExitPopup(false)}
        onQuit={handleQuit}
      />
    )}

    <motion.div
      className="relative z-10 w-full max-w-170 rounded-3xl border border-white/10 bg-[rgba(30,41,59,0.5)] p-6 shadow-2xl backdrop-blur-sm md:p-11.5"
    >
      {/* Menu button inside card */}
      <div className="mb-4 flex justify-start">
        <button
          onClick={() => setShowExitPopup(true)}
          className="flex cursor-pointer items-center gap-1.5 rounded-[10px] border border-white/10 bg-white/5 px-4 py-2 text-[0.85rem] font-semibold text-white/50 transition-all duration-200 hover:bg-white/10 hover:text-white"
        >
          ← Menu
        </button>
      </div>

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
        attemptCount={attemptCount}
      />

      {attemptCount >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-3 text-center"
        >
          <p className="mb-3 text-[0.9rem] font-medium text-red-500">
            ❌ Maximum attempts reached. This problem has been added to your practice queue.
          </p>
          <button
            onClick={handleQuit}
            className="cursor-pointer rounded-[10px] border border-red-500/30 bg-red-500/15 px-6 py-2 text-[0.85rem] font-semibold text-red-500 transition-colors duration-200 hover:bg-red-500/25"
          >
            Quit Problem
          </button>
        </motion.div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={attemptCount >= 3}
          className={`rounded-xl px-8 py-2.5 text-base font-semibold text-white transition-colors duration-200 ${
            attemptCount >= 3
              ? "cursor-not-allowed bg-[#444] opacity-60"
              : "cursor-pointer bg-blue-500 hover:bg-blue-400"
          }`}
        >
          Submit
        </button>
      </div>
    </motion.div>
  </div>
);
}

export default App