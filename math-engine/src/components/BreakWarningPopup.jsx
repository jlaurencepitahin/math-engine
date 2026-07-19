import { motion } from "framer-motion"

function BreakWarningPopup({ onContinue, onBack }) {
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
          border: "1px solid rgba(250, 204, 21, 0.3)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
          textAlign: "center"
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>⚠️</div>

        <h3 style={{
          fontSize: "1.4rem",
          fontWeight: "700",
          color: "#FACC15",
          marginBottom: "12px"
        }}>
          You're on Cooldown
        </h3>

        <p style={{
          fontSize: "0.9rem",
          color: "#777777",
          lineHeight: 1.6,
          marginBottom: "28px"
        }}>
          Practice mode is locked. We recommend taking a short break before continuing with Normal Mode too — your brain will thank you.
        </p>

        <div style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center"
        }}>
          <button
            onClick={onBack}
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "12px",
              padding: "12px 28px",
              fontSize: "0.95rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.15)"}
            onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.08)"}
          >
            Back
          </button>

          <button
            onClick={onContinue}
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
            Continue Anyway
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default BreakWarningPopup