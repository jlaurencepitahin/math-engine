import { motion, AnimatePresence } from "framer-motion";

function ScoreBar({
  score,
  problemIndex,
  stepIndex,
  totalSteps,
  scoreDelta,
  isPracticeMode,
}) {
  return (
    <div className="relative mb-6 flex h-12 w-full items-center justify-between">
      {/* Score */}
      <div className="relative flex h-12 min-w-130px items-center">
        <span className="text-xl font-bold text-white">
          Score: {score}
        </span>

        <AnimatePresence>
          {scoreDelta !== null && (
            <motion.span
              key={scoreDelta + "-" + Date.now()}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -36, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`pointer-events-none absolute left-0 -top-1 whitespace-nowrap text-sm font-bold ${
                scoreDelta > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Center */}
      <div className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center">
        {isPracticeMode && (
          <span className="mb-0.5 text-[0.7rem] font-bold tracking-0.1em text-yellow-400">
            ⚔️ PRACTICE MODE
          </span>
        )}

        <span className="text-lg font-bold text-white">
          Problem No. {problemIndex + 1}
        </span>

        <span className="text-sm text-gray-500">
          Step No. {stepIndex + 1}/{totalSteps}
        </span>
      </div>

      {/* Spacer */}
      <div className="min-w-130px" />
    </div>
  );
}

export default ScoreBar;