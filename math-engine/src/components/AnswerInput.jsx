import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
    if (isWrong) setShowHint(true)
    else setShowHint(false)
  }, [feedback])

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

  const hintVisible = showHint && (isWrong || isLocked)

  return (
    <div className="relative w-full">

      {/* Hint icon — always visible */}
      <div className="absolute -right-1 -top-7">
        <button
          onClick={() => setShowHint(prev => !prev)}
          className={`cursor-pointer border-none bg-transparent p-1 transition-colors duration-200 ${
            showHint ? "text-blue-500" : "text-white/40"
          }`}
        >
          <Info size={16} />
        </button>
      </div>

      {/* Layout — row on desktop, column on mobile */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "12px",
          alignItems: "flex-start",
          width: "100%",
          overflow: "hidden"
        }}
      >

        {/* Input — always takes remaining space */}
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
          className={`box-border resize-none rounded-2xl border-2 p-4 font-['Fira_Code'] text-base outline-none transition-colors duration-300 ${borderClass} ${bgClass} ${textClass} ${
            isLocked ? "cursor-not-allowed opacity-80" : "cursor-text"
          }`}
          style={{
            flex: 1,
            height: "160px",
            minWidth: 0
          }}
        />

        {/* Hint — slides in from right on desktop, fades in below on mobile */}
        <motion.div
          initial={false}
          animate={
            isMobile
              ? { opacity: hintVisible ? 1 : 0, height: hintVisible ? 160 : 0 }
              : { opacity: hintVisible ? 1 : 0, width: hintVisible ? "42%" : "0%" }
          }
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            overflow: "hidden",
            flexShrink: 0,
            height: isMobile ? undefined : "160px",
            width: isMobile ? "100%" : undefined
          }}
        >
          {hintVisible && <HintBox hint={hint} />}
        </motion.div>

      </div>
    </div>
  )
}

export default AnswerInput