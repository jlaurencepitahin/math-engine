import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import HintBox from "./HintBox"

function AnswerInput({ value, onChange, feedback, hint, onSubmit }) {
  const [showHint, setShowHint] = useState(false)

  const isWrong = feedback === "incorrect"
  const isCorrect = feedback === "correct"

  useEffect(() => {
    if (isWrong) setShowHint(true)
    else setShowHint(false)
  }, [feedback])

  const borderColor = isCorrect ? "#22C55E"
    : isWrong ? "#EF4444"
    : "rgba(255,255,255,0.15)"

  const placeholderText = isWrong
    ? "Incorrect. Try again..."
    : "Your answer..."

  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      width: "100%"
    }}>

      {/* Input wrapper — only animates after first wrong answer */}
      <motion.div
        initial={false}
        animate={{
          width: (isWrong && showHint) ? "80%" : "100%"
        }}
        transition={{ duration: 0.60, ease: "easeInOut" }}
        style={{ flexShrink: 0, position: "relative" }}
      >
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              onSubmit()
            }
          }}
          placeholder={placeholderText}
          rows={6}
          style={{
            width: "100%",
            borderRadius: "16px",
            padding: "16px",
            fontSize: "1rem",
            resize: "none",
            outline: "none",
            border: `2px solid ${borderColor}`,
            background: "rgba(255,255,255,0.92)",
            color: isWrong ? "#EF4444" : "#0F172A",
            fontFamily: "'Fira Code', monospace",
            boxSizing: "border-box",
            minHeight: "300px",
            transition: "border-color 0.3s ease"
          }}
        />
      </motion.div>

      {/* Hint area — only mounts when wrong */}
        {isWrong && (
            <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            width: "20%",
            flexShrink: 1
        }}>

          {/* Toggle button — always visible when wrong */}
          <button
            onClick={() => setShowHint(prev => !prev)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: showHint ? "#3B82F6" : "rgba(255,255,255,0.5)",
              transition: "color 0.2s",
              lineHeight: 1
            }}
          >
            <Info size={18} />
          </button>

          {/* Animated hint box */}
          <motion.div
            initial={false}
            animate={{
              opacity: showHint ? 1 : 0,
              width: showHint ? "auto" : 0,
            }}
            transition={{ duration: 0.50, ease: "easeOut" }}
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