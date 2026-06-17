import { motion } from "framer-motion"

function ExitConfirmPopup({ score, isPracticeMode, onStay, onQuit }) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
      backdropFilter: "blur(4px)"
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "24px",
          padding: "40px 36px",
          background: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
          textAlign: "center"
        }}
      >
        {/* Icon */}
        <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
          🚪
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "1.4rem",
          fontWeight: "700",
          color: "#F2F0EF",
          marginBottom: "12px"
        }}>
          Quit Session?
        </h3>

        {/* Warning */}
        <p style={{
          fontSize: "0.9rem",
          color: "#777777",
          lineHeight: 1.6,
          marginBottom: "24px"
        }}>
          {isPracticeMode
            ? "Quitting will discard your current session progress."
            : "Quitting will discard your progress. Wrong answers accumulated this session won't be saved to the practice queue."}
        </p>

        {/* Score */}
        <div style={{
          background: "rgba(59, 130, 246, 0.1)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
          borderRadius: "12px",
          padding: "12px 24px",
          marginBottom: "28px",
          display: "inline-block"
        }}>
          <p style={{
            fontSize: "0.75rem",
            color: "#777777",
            margin: "0 0 4px 0"
          }}>
            Current Score
          </p>
          <p style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            color: "#FACC15",
            margin: 0,
            fontFamily: "'Fira Code', monospace"
          }}>
            {score}
          </p>
        </div>

        {/* Buttons */}
        <div style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center"
        }}>
          <button
            onClick={onStay}
            style={{
              background: "#3B82F6",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "12px 28px",
              fontSize: "0.95rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseEnter={e => e.target.style.background = "#60A5FA"}
            onMouseLeave={e => e.target.style.background = "#3B82F6"}
          >
            Stay
          </button>

          <button
            onClick={onQuit}
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              color: "#EF4444",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "12px",
              padding: "12px 28px",
              fontSize: "0.95rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              e.target.style.background = "rgba(239, 68, 68, 0.25)"
            }}
            onMouseLeave={e => {
              e.target.style.background = "rgba(239, 68, 68, 0.15)"
            }}
          >
            Quit
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default ExitConfirmPopup