import { motion, AnimatePresence } from "framer-motion"

function ScoreBar({ score, problemIndex, stepIndex, totalSteps, scoreDelta }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: "24px",
      height: "48px",        
      position: "relative"   
    }}>

      {/* Score — left */}
      <div style={{
        position: "relative",
        minWidth: "130px",
        height: "48px",
        display: "flex",
        alignItems: "center"
      }}>
        <span style={{
          fontSize: "1.25rem",
          fontWeight: "700",
          color: "white"
        }}>
          Score: {score}
        </span>

        {/* Delta floats — never touches layout */}
        <AnimatePresence>
          {scoreDelta !== null && (
            <motion.span
              key={scoreDelta + "-" + Date.now()}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -36, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "-4px",
                left: "0",
                fontWeight: "700",
                fontSize: "0.9rem",
                color: scoreDelta > 0 ? "#22C55E" : "#EF4444",
                pointerEvents: "none",
                whiteSpace: "nowrap"
              }}
            >
              {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Problem No. — absolutely centered */}
      <div style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <span style={{
          fontSize: "1.1rem",
          fontWeight: "700",
          color: "white"
        }}>
          Problem No. {problemIndex + 1}
        </span>
        <span style={{
          fontSize: "0.8rem",
          color: "#777777"
        }}>
          Step No. {stepIndex + 1}/{totalSteps}
        </span>
      </div>

      {/* Right spacer */}
      <div style={{ minWidth: "130px" }} />

    </div>
  )
}

export default ScoreBar