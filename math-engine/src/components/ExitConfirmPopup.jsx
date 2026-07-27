import { motion } from "framer-motion";

function ExitConfirmPopup({
  score,
  isPracticeMode,
  onStay,
  onQuit,
}) {
  return (
    <div className="fixed inset-0 z-100 flex h-screen w-screen items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-420px rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.95)] px-9 py-10 text-center shadow-2xl backdrop-blur-xl"
      >
        {/* Icon */}
        <div className="mb-4 text-[2.5rem]">
          🚪
        </div>

        {/* Title */}
        <h3 className="mb-3 text-[1.4rem] font-bold text-[#F2F0EF]">
          Quit Session?
        </h3>

        {/* Description */}
        <p className="mb-6 text-[0.9rem] leading-relaxed text-[#777777]">
          {isPracticeMode
            ? "Quitting will discard your current session progress."
            : "Quitting will discard your progress. Wrong answers accumulated this session won't be saved to the practice queue."}
        </p>

        {/* Score Card */}
        <div className="mb-7 inline-block rounded-xl border border-blue-500/20 bg-blue-500/10 px-6 py-3">
          <p className="mb-1 text-xs text-[#777777]">
            Current Score
          </p>

          <p className="font-['Fira_Code'] text-[1.8rem] font-bold text-yellow-400">
            {score}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onStay}
            className="cursor-pointer rounded-xl bg-blue-500 px-7 py-3 text-[0.95rem] font-semibold text-white transition-colors duration-200 hover:bg-blue-400"
          >
            Stay
          </button>

          <button
            onClick={onQuit}
            className="cursor-pointer rounded-xl border border-red-500/30 bg-red-500/15 px-7 py-3 text-[0.95rem] font-semibold text-red-500 transition-colors duration-200 hover:bg-red-500/25"
          >
            Quit
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ExitConfirmPopup;