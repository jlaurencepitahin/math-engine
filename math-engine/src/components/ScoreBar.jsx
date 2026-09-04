import { motion, AnimatePresence } from "framer-motion"

function ScoreBar({ score, problemIndex, stepIndex, totalSteps, scoreDelta, isPracticeMode }) {
  return (
    <div className="mb-6 grid w-full grid-cols-3 items-start gap-2">

      {/* Score — left */}
      <div className="relative flex items-center">
        <span className="text-xl font-bold text-white">
          Score: {score}
        </span>
        <AnimatePresence>
          {scoreDelta !== null && (
            <motion.span
              key={scoreDelta}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -36, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="pointer-events-none absolute -top-1 left-0 whitespace-nowrap text-sm font-bold"
              style={{ color: scoreDelta > 0 ? "#22C55E" : "#EF4444" }}
            >
              {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Problem No. — center */}
      <div className="flex flex-col items-center text-center">
        {isPracticeMode && (
          <span className="mb-0.5 text-[0.7rem] font-bold tracking-[0.1em] text-yellow-400">
            ⚔️ PRACTICE MODE
          </span>
        )}
        <span className="text-lg font-bold text-white">
          Problem No. {problemIndex + 1}
        </span>
        <span className="text-sm text-[#777777]">
          Step No. {stepIndex + 1}/{totalSteps}
        </span>
      </div>

      {/* Right spacer */}
      <div />

    </div>
  )
}

export default ScoreBar