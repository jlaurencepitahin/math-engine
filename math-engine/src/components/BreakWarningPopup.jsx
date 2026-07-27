import { motion } from "framer-motion";

function BreakWarningPopup({ onContinue, onBack }) {
  return (
    <div className="fixed inset-0 z-100 flex h-screen w-screen items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-420px rounded-3xl border border-yellow-400/30 bg-[rgba(15,23,42,0.95)] px-9 py-10 text-center shadow-2xl backdrop-blur-xl"
      >
        {/* Icon */}
        <div className="mb-4 text-[2.5rem]">
          ⚠️
        </div>

        {/* Title */}
        <h3 className="mb-3 text-[1.4rem] font-bold text-yellow-400">
          You're on Cooldown
        </h3>

        {/* Description */}
        <p className="mb-7 text-[0.9rem] leading-relaxed text-[#777777]">
          Practice mode is locked. We recommend taking a short break before
          continuing with Normal Mode too — your brain will thank you.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onBack}
            className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-7 py-3 text-[0.95rem] font-semibold text-white transition-colors duration-200 hover:bg-white/15"
          >
            Back
          </button>

          <button
            onClick={onContinue}
            className="cursor-pointer rounded-xl bg-blue-500 px-7 py-3 text-[0.95rem] font-semibold text-white transition-colors duration-200 hover:bg-blue-400"
          >
            Continue Anyway
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default BreakWarningPopup;