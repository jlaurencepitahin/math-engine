import { useEffect, useState } from "react"

const STORAGE_KEY = "mathventure_wrong_problems"

function useEngine(problems) {
  const [problemIndex, setProblemIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [isComplete, setIsComplete] = useState(null)
  const [attemptCount, setAttemptCount] = useState(0)
  const [isPracticeMode, setIsPracticeMode] = useState(false)
  const [practiceIndex, setPracticeIndex] = useState(0)
  const [practiceAttemptCount, setPracticeAttemptCount] = useState(0)
  const [practiceRetryCount, setPracticeRetryCount] = useState(0)
  const [cooldownEndTime, setCooldownEndTime] = useState(null)
  const [wrongProblems, setWrongProblems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return []
      const parsed = JSON.parse(saved)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wrongProblems))
  }, [wrongProblems])

  const currentProblem = isPracticeMode
    ? wrongProblems[practiceIndex]
    : problems[problemIndex]

  const currentStep = currentProblem ?currentProblem.steps[stepIndex] : null

  function addToWrongProblems(problem) {
    setWrongProblems(prev => {
      const alreadyAdded = prev.find(p => p.id === problem.id)
      if (alreadyAdded) return prev
      return [...prev, problem]
    })
  }

  function removeFromWrongProblems(problem) {
    setWrongProblems(prev => prev.filter(p => p.id !== problem.id))
  }

  function triggerCooldown() {
    setCooldownEndTime(Date.now() + 5 * 60 * 1000)
    setPracticeRetryCount(0)
  }

  function clearCooldown() {
    setCooldownEndTime(null)
  }

  function advanceAfterCorrect() {
    const isLastStep = stepIndex === currentProblem.steps.length - 1

    if (isPracticeMode) {
      const isLastPractice = practiceIndex === wrongProblems.length - 1

      if (isLastStep) {
        const hadTooManyMistakes = practiceAttemptCount >= 3

        if (hadTooManyMistakes) {
          const newRetryCount = practiceRetryCount + 1
          setPracticeRetryCount(newRetryCount)

          if (newRetryCount >= 2) {
            triggerCooldown()
            setTimeout(() => setIsComplete("cooldown"), 1000)
          } else {
            setTimeout(() => setIsComplete("retry"), 1000)
          }
        } else {
          removeFromWrongProblems(currentProblem)

          if (isLastPractice) {
            setTimeout(() => setIsComplete("clean"), 1000)
          } else {
            setTimeout(() => {
              setPracticeIndex(prev => prev + 1)
              setStepIndex(0)
              setAttemptCount(0)
              setPracticeAttemptCount(0)
              setFeedback(null)
            }, 1000)
          }
        }

        setPracticeAttemptCount(0)

      } else {
        setTimeout(() => {
          setStepIndex(prev => prev + 1)
          setAttemptCount(0)
          setFeedback(null)
        }, 1000)
      }

    } else {
      const isLastProblem = problemIndex === problems.length - 1

      if (isLastStep && isLastProblem) {
        setTimeout(() => setIsComplete("complete"), 1000)
      } else if (isLastStep) {
        setTimeout(() => {
          setProblemIndex(prev => prev + 1)
          setStepIndex(0)
          setAttemptCount(0)
          setFeedback(null)
        }, 1000)
      } else {
        setTimeout(() => {
          setStepIndex(prev => prev + 1)
          setAttemptCount(0)
          setFeedback(null)
        }, 1000)
      }
    }
  }

  function submitAnswer(userAnswer) {
    const correct =
      userAnswer.trim().toLowerCase() ===
      currentStep.answer.trim().toLowerCase()

    if (correct) {
      setScore(prev => prev + 10)
      setFeedback("correct")
      setAttemptCount(0)
      advanceAfterCorrect()
    } else {
      const newAttemptCount = attemptCount + 1
      setAttemptCount(newAttemptCount)

      if (isPracticeMode) {
        setPracticeAttemptCount(prev => prev + 1)
      }

      const deduction = newAttemptCount === 1 ? 5
        : newAttemptCount === 2 ? 10
        : 15

      setScore(prev => Math.max(0, prev - deduction))
      setFeedback("incorrect")

      if (newAttemptCount >= 3 && !isPracticeMode) {
        addToWrongProblems(currentProblem)
      }
    }
  }

  function dismissFeedback() {
    setFeedback(null)
  }

  function startPracticeMode() {
    setIsPracticeMode(true)
    setPracticeIndex(0)
    setStepIndex(0)
    setAttemptCount(0)
    setPracticeAttemptCount(0)
    setFeedback(null)
    setScore(0)
    setIsComplete(null)
  }

  function startNormalMode() {
    setIsPracticeMode(false)
    setProblemIndex(0)
    setStepIndex(0)
    setAttemptCount(0)
    setFeedback(null)
    setScore(0)
    setIsComplete(null)
  }

  function returnToMenu() {
    setProblemIndex(0)
    setStepIndex(0)
    setScore(0)
    setFeedback(null)
    setIsComplete(null)
    setAttemptCount(0)
    setIsPracticeMode(false)
    setPracticeIndex(0)
    setPracticeAttemptCount(0)
  }

  function resetGame() {
    setProblemIndex(0)
    setStepIndex(0)
    setScore(0)
    setFeedback(null)
    setIsComplete(null)
    setAttemptCount(0)
    setWrongProblems([])
    setIsPracticeMode(false)
    setPracticeIndex(0)
    setPracticeAttemptCount(0)
    setPracticeRetryCount(0)
    setCooldownEndTime(null)
  }

  return {
    currentProblem: currentProblem ?? null,
    currentStep: currentStep ?? null,
    stepIndex,
    score,
    feedback,
    isComplete,
    attemptCount,
    wrongProblems,
    isPracticeMode,
    practiceAttemptCount,
    practiceRetryCount,
    cooldownEndTime,
    triggerCooldown,
    clearCooldown,
    submitAnswer,
    dismissFeedback,
    resetGame,
    returnToMenu,
    startNormalMode,
    startPracticeMode
  }
}

export default useEngine