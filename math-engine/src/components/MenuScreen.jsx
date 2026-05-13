import { motion } from "framer-motion"
import ModeCard from "./ModeCard"
import MathBackground from "./MathBackground"

function MenuScreen({ onSelectNormal, onSelectPractice, wrongProblemsCount }) {
  const hasPracticeProblems = wrongProblemsCount > 0

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "#0F172A",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      position: "relative",
      gap: "48px"
    }}>
      <MathBackground />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center"
        }}
      >
        <h1 style={{
          fontSize: "3.5rem",
          fontWeight: "700",
          color: "#F2F0EF",
          margin: "0 0 8px 0",
          letterSpacing: "-0.02em"
        }}>
          ⚔️ Mathventure
        </h1>
        <p style={{
          fontSize: "1rem",
          color: "#777777",
          margin: 0
        }}>
          Conquer math one problem at a time
        </p>
      </motion.div>

      {/* Mode cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: "24px",
          width: "100%",
          maxWidth: "760px"
        }}
      >
        <ModeCard
          title="Normal Mode"
          subtitle="Derivatives — Power Rule"
          description="Work through all problems step by step. Wrong answers are tracked and sent to Practice Mode."
          buttonLabel="Play"
          onClick={onSelectNormal}
        />

        <ModeCard
          title="Practice Mode"
          subtitle={hasPracticeProblems ? "Problems waiting" : "Nothing here yet"}
          description={
            hasPracticeProblems
              ? "Retry the problems you struggled with. Clear your queue and master the material."
              : "Play Normal Mode first. Problems you struggle with will appear here."
          }
          badge={hasPracticeProblems ? `${wrongProblemsCount} problem${wrongProblemsCount > 1 ? "s" : ""} to retry` : null}
          buttonLabel="Practice"
          onClick={onSelectPractice}
          disabled={!hasPracticeProblems}
        />
      </motion.div>
    </div>
  )
}

export default MenuScreen