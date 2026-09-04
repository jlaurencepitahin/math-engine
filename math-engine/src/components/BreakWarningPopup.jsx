import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import HintBox from "./HintBox"
import useIsMobile from "../hooks/useIsMobile"

function AnswerInput({ value, onChange, feedback, hint, onSubmit, attemptCount }) {
  const [showHint, setShowHint] = useState(false)
  const isMobile = useIsMobile()

  const isWrong = feedback === "incorrect"
  const isCorrect = feedback === "correct"
  const isLocked = attemptCount >= 3

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isWrong) setShowHint(true)
    else setShowHint(false)
  }, [feedback, isWrong])

  const borderClass = isCorrect
    ? "border-green-500"
    : isWrong || isLocked
    ? "border-red-500"
    : "border-white/15"

  const bgClass = isLocked ? "bg-red-500/5" : "bg-white/90"

  const textClass = isWrong || isLocked
    ? "text-red-500"
    : "text-[#0F172A]"

  const placeholderText = isLocked
    ? "Maximum attempts reached."
    : isWrong
    ? "Incorrect. Try again..."
    : "Your answer..."

  return (
    <div className={`flex w-full gap-3 ${
      isMobile ? "flex-col items-start" : "flex-row items-start"
    }`}>

      {/* Input — animated width on desktop, full width on mobile */}
      <motion.div
        initial={false}
        animate={{
          width: (!isMobile && (isWrong || isLocked) && showHint)
            ? "58%"
            : "100%"
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="relative shrink-0"
        style={{ width: isMobile ? "100%" : undefined }}
      >
        <textarea
          value={isLocked ? "" : value}
          onChange={e => !isLocked && onChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              if (!isLocked) onSubmit()
            }
          }}
          placeholder={placeholderText}
          rows={6}
          disabled={isLocked}
          className={`box-border min-h-40 w-full resize-none rounded-2xl border-2 p-4 font-['Fira_Code'] text-base outline-none transition-colors duration-300 ${borderClass} ${bgClass} ${textClass} ${
            isLocked ? "cursor-not-allowed opacity-80" : "cursor-text"
          }`}
        />
      </motion.div>

      {/* Hint area */}
      {(isWrong || isLocked) && (
        <div className={`flex flex-col items-end gap-2 ${
          isMobile ? "w-full" : "w-[40%] shrink-0"
        }`}>
          <button
            onClick={() => setShowHint(prev => !prev)}
            className={`cursor-pointer border-none bg-transparent p-1 leading-none transition-colors duration-200 ${
              showHint ? "text-blue-500" : "text-white/50"
            }`}
          >
            <Info size={18} />
          </button>

          <motion.div
            initial={false}
            animate={{
              opacity: showHint ? 1 : 0,
              height: showHint ? "auto" : 0
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`overflow-hidden ${
              showHint ? "pointer-events-auto" : "pointer-events-none"
            } ${isMobile ? "w-full" : "w-full"}`}
          >
            <HintBox hint={hint} />
          </motion.div>
        </div>
      )}

    </div>
  )
}

export default AnswerInput