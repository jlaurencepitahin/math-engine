import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import HintBox from "./HintBox"

function AnswerInput({ value, onChange, feedback, hint, onSubmit, attemptCount }) {
  const [showHint, setShowHint] = useState(false)

  const isWrong = feedback === "incorrect"
  const isCorrect = feedback === "correct"
  const isLocked = attemptCount >= 3   // ← new

  useEffect(() => {
    if (isWrong) setShowHint(true)
    else setShowHint(false)
  }, [feedback])

  const borderColor = isCorrect ? "#22C55E"
    : isWrong ? "#EF4444"
    : isLocked ? "#EF4444"    // ← stays red when locked
    : "rgba(255,255,255,0.15)"

  const placeholderText = isLocked
    ? "Maximum attempts reached."
    : isWrong ? "Incorrect. Try again..."
    : "Your answer..."

  return (
    <div style={{
      display: "flex",
      gap: "12px",
      alignItems: "flex-start",
      width: "100%"
    }}>
      <motion.div
        initial={false}
        animate={{
          width: (isWrong && showHint) ? "58%" : "100%"
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{ flexShrink: 0, position: "relative" }}
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
          style={{
            width: "100%",
            borderRadius: "16px",
            padding: "16px",
            fontSize: "1rem",
            resize: "none",
            outline: "none",
            border: `2px solid ${borderColor}`,
            background: isLocked
              ? "rgba(239, 68, 68, 0.05)"
              : "rgba(255,255,255,0.92)",
            color: isWrong || isLocked ? "#EF4444" : "#0F172A",
            fontFamily: "'Fira Code', monospace",
            boxSizing: "border-box",
            minHeight: "160px",
            transition: "border-color 0.3s ease",
            cursor: isLocked ? "not-allowed" : "text",
            opacity: isLocked ? 0.8 : 1
          }}
        />
      </motion.div>

      {(isWrong || isLocked) && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "8px",
          width: "40%",
          flexShrink: 0
        }}>
          <button
            onClick={() => setShowHint(prev => !prev)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: showHint ? "#3B82F6" : "rgba(255,255,255,0.5)",
              transition: "color 0.2s",
              lineHeight: 1
            }}
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
            style={{
              width: "100%",
              overflow: "hidden",
              pointerEvents: showHint ? "auto" : "none"
            }}
          >
            <HintBox hint={hint} />
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AnswerInput