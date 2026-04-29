import { useEffect, useState } from "react";

const STORAGE_KEY = "mathventure_wrong_problems"

function useEngine(problems){
    const [problemIndex, setProblemIndex] = useState(0)
    const [stepIndex, setStepIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [feedback, setFeedback] = useState(null)
    const [isComplete, setIsComplete] = useState(0)
    const [attemptCount, setAttemptCount] = useState(0)
    const [isPracticeMode, setIsPracticeMode] = useState(false)
    const [practiceIndex, setPracticeIndex] = useState(0)

    const [wrongProblems, setWrongProblems] = useState(() => {
        try{
            const saved = localStorage.getItem(STORAGE_KEY)
            return saved ? JSON.parse : []
        }catch{
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wrongProblems))
    }, [wrongProblems])

    const currentProblem = isPracticeMode ? wrongProblems[practiceIndex] : problems[problemIndex]
    const currentStep = currentProblem.steps[stepIndex]

    function addToWrongProblems(problem){
        setWrongProblems(prev =>{
            const alreadyAdded = prev.find(p => p.id === problem.id)
            if(alreadyAdded) return prev
            return [...prev, problem]
        })
    }

    function advanceAfterCorrect(){
        const isLastStep = stepIndex === currentProblem.steps.length - 1

        if(isPracticeMode){
            const isLastPractice = practiceIndex === wrongProblems.length - 1
            if(isLastStep && isLastPractice){
                removeFromWrongProblems(currentProblem)
                setTimeout(() => setIsComplete(true), 1000)
            }else if(isLastStep){
                removeFromWrongProblems(currentProblem)
                setTimeout(() => {
                    setPracticeIndex(prev => prev +1)
                    setStepIndex(0)
                    setAttemptCount(0)
                    setFeedback(null)
                }, 1000)
            }else{
                setTimeout(() => {
                    setStepIndex(prev => prev +1)
                    setAttemptCount(0)
                    setFeedback(null)
                }, 1000)
            }
        }else{
            const isLastPractice = problemIndex === problems.length - 1
            if(isLastStep && isLastPractice){
                setTimeout(() => setIsComplete(true), 1000)
            }else if(isLastStep){
                 setTimeout(() => {
                    setProblemIndex(prev => prev + 1)
                    setStepIndex(0)
                    setAttemptCount(0)
                    setFeedback(null)
                 }, 1000)
            }else{
                setTimeout(() => {
                    setStepIndex(prev => prev + 1)
                    setAttemptCount(0)
                    setFeedback(null)
                }, 1000)
            }
        }
    }

    function submitAnswer(userAnswer){
        const correct = userAnswer.trim().toLowerCase() === currentStep.answer.trim().toLowerCase()

        if(correct){
            setScore(prev => prev + 10)
            setFeedback("correct")
            setAttemptCount(0)
            advanceAfterCorrect()
        }else{
            const newAttempCount = attemptCount + 1
            setAttemptCount(newAttempCount)

            const deduction = newAttempCount === 1 ? 5 : newAttempCount === 2 ? 10 : 15

            setScore(prev => Math.max(0, prev - deduction))
            setFeedback("incorrect")

            if(newAttempCount >=3){
                addToWrongProblems(currentProblem)
            }
        }
    }
    function dismissFeedback(){
        setFeedback(null)
    }

    function resetGame(){
        setProblemIndex(0)
        setStepIndex(0)
        setScore(0)
        setFeedback(null)
        setIsComplete(false)
        setAttemptCount(0)
        setWrongProblems([])
        setIsPracticeMode(false)
        setPracticeIndex(0)
    }

    return{
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
        resetGame
    }
}

export default useEngine