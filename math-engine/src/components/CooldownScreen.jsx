import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MathBackground from "./MathBackground"

function CooldownScreen({ cooldownEndTime, onReturnToMenu, clearCooldown }) {
  const [timeLeft, setTimeLeft] = useState(null)
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    function tick() {
      const remaining = cooldownEndTime - Date.now()

      if (remaining <= 0) {
        setTimeLeft(0)
        setUnlocked(true)
        clearCooldown()
        return
      }

      setTimeLeft(remaining)
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [cooldownEndTime])

  const minutes = timeLeft ? Math.floor(timeLeft / 60000) : 0
  const seconds = timeLeft ? Math.floor((timeLeft % 60000) / 1000) : 0
  const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

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

      <AnimatePresence mode="wait">
        {!unlocked ? (

          // Cooldown active screen
          <motion.div
            key="cooldown"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "480px",
              borderRadius: "24px",
              padding: "48px 40px",
              background: "rgba(30, 41, 59, 0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(250, 204, 21, 0.3)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
              textAlign: "center"
            }}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              style={{ fontSize: "3.5rem", marginBottom: "16px" }}
            >
              ⏳
            </motion.div>

            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: "700",
              color: "#FACC15",
              marginBottom: "8px"
            }}>
              Take a Break!
            </h2>

            <p style={{
              fontSize: "0.95rem",
              color: "#777777",
              lineHeight: 1.6,
              marginBottom: "32px"
            }}>
              You've been struggling with this problem. Rest your mind — practice will unlock when the timer ends.
            </p>

            {/* Countdown timer */}
            <div style={{
              background: "rgba(250, 204, 21, 0.1)",
              border: "1px solid rgba(250, 204, 21, 0.25)",
              borderRadius: "16px",
              padding: "24px 48px",
              marginBottom: "32px",
              display: "inline-block"
            }}>
              <p style={{
                fontSize: "0.8rem",
                color: "#777777",
                margin: "0 0 8px 0",
                letterSpacing: "0.05em"
              }}>
                PRACTICE UNLOCKS IN
              </p>
              <p style={{
                fontSize: "3rem",
                fontWeight: "700",
                color: "#FACC15",
                margin: 0,
                fontFamily: "'Fira Code', monospace",
                letterSpacing: "0.05em"
              }}>
                {formatted}
              </p>
            </div>

            <button
              onClick={onReturnToMenu}
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
                padding: "12px 32px",
                fontSize: "0.95rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s",
                display: "block",
                margin: "0 auto"
              }}
              onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.08)"}
            >
              Back to Menu
            </button>
          </motion.div>

        ) : (

          // Unlocked screen
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
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
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              style={{ fontSize: "3.5rem", marginBottom: "16px" }}
            >
              🎉
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                color: "#22C55E",
                marginBottom: "8px"
              }}
            >
              Practice Unlocked!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                fontSize: "0.95rem",
                color: "#777777",
                lineHeight: 1.6,
                marginBottom: "32px"
              }}
            >
              Hope you feel refreshed! Head back to the menu and give it another shot.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              onClick={onReturnToMenu}
              style={{
                background: "#22C55E",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "12px 32px",
                fontSize: "0.95rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s",
                display: "block",
                margin: "0 auto"
              }}
              onMouseEnter={e => e.target.style.background = "#16A34A"}
              onMouseLeave={e => e.target.style.background = "#22C55E"}
            >
              Back to Menu
            </motion.button>
          </motion.div>

        )}
      </AnimatePresence>
    </div>
  )
}

export default CooldownScreen