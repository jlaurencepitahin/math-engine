import { motion } from "framer-motion";
import MathBackground from "./MathBackground";

function PracticeResultScreen({ onRetry, onMenu, score }) {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-[#0F172A] p-6">
      <MathBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-480px rounded-3xl border border-red-500/30 bg-[rgba(30,41,59,0.5)] px-10 py-12 text-center shadow-2xl backdrop-blur-xl"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
          className="mb-4 text-[3.5rem]"
        >
          💀
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-2 text-[1.8rem] font-bold text-red-500"
        >
          You struggled with this one
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8 text-[0.95rem] leading-relaxed text-[#777777]"
        >
          You made 3 or more mistakes on this problem.
          <br />
          Want to try again or come back later?
        </motion.p>

        {/* Score */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-8 inline-block rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-3"
        >
          <p className="mb-1 text-[0.8rem] text-[#777777]">
            Current Score
          </p>

          <p className="font-['Fira_Code'] text-[2rem] font-bold text-yellow-400">
            {score}
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center gap-3"
        >
          <button
            onClick={onMenu}
            className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-7 py-3 text-[0.95rem] font-semibold text-white transition-colors duration-200 hover:bg-white/15"
          >
            Menu
          </button>

          <button
            onClick={onRetry}
            className="cursor-pointer rounded-xl bg-blue-500 px-7 py-3 text-[0.95rem] font-semibold text-white transition-colors duration-200 hover:bg-blue-400"
          >
            ⚔️ Retry
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default PracticeResultScreen;