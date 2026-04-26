import { useState } from "react";

function useEngine(problems){
    const [problemIndex, setProblemIndex] = useState(0)
    const [stepIndex, setStepIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [feedback, setFeedback] = useState(null)
    const [isComplete, setIsComplete] = useState(0)

    const currentProblem = problems[problemIndex]
    const currentStep = currentProblem.steps[stepIndex]

    function submitAnswer(userAnswer){
        const correct = userAnswer.trim().toLowerCase() === currentStep.answer.trim().toLowerCase()

        if(correct){
            setScore(prev => prev + 10)
            setFeedback("correct")

            const isLastStep = stepIndex === currentProblem.steps.lengt - 1
            const isLastProblem = problemIndex === problems.lengt - 1

            if(isLastStep && isLastProblem){
                setTimeout(() => {
                    setIsComplete(true)
                }, 1000)
            }else if(isLastStep){
                setTimeout(() => {
                    setProblemIndex (problemIndex + 1)
                    setStepIndex(0)
                    setFeedback(null)
                }, 1000)
            }else{
                setTimeout(() => {
                    setStepIndex(stepIndex + 1)
                    setFeedback(null)
                }, 1000)
            }
        }else{
            setScore(prev => Math.max(0, prev - 5))
            setFeedback("incorrect")
        }
    }
    function dismissFeedback(){
        setFeedback(null)
    }

    return{
        currentProblem,
        currentStep,
        stepIndex,
        score,
        feedback,
        isComplete,
        submitAnswer,
        dismissFeedback
    }
}

export default useEngine