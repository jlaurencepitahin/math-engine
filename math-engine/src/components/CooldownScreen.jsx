import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MathBackground from "./MathBackground";

function CooldownScreen({
  cooldownEndTime,
  onReturnToMenu,
  clearCooldown,
}) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    function tick() {
      const remaining = cooldownEndTime - Date.now();

      if (remaining <= 0) {
        setTimeLeft(0);
        setUnlocked(true);
        clearCooldown();
        return;
      }

      setTimeLeft(remaining);
    }

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [cooldownEndTime]);

  const minutes = timeLeft ? Math.floor(timeLeft / 60000) : 0;
  const seconds = timeLeft
    ? Math.floor((timeLeft % 60000) / 1000)
    : 0;

  const formatted = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-[#0F172A] p-6">
      <MathBackground />

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="cooldown"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 w-full max-w-480px rounded-3xl border border-yellow-400/30 bg-[rgba(30,41,59,0.5)] px-10 py-12 text-center shadow-2xl backdrop-blur-xl"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="mb-4 text-[3.5rem]"
            >
              ⏳
            </motion.div>

            <h2 className="mb-2 text-[1.8rem] font-bold text-yellow-400">
              Take a Break!
            </h2>

            <p className="mb-8 text-[0.95rem] leading-relaxed text-[#777777]">
              You've been struggling with this problem. Rest your mind —
              practice will unlock when the timer ends.
            </p>

            <div className="mb-8 inline-block rounded-2xl border border-yellow-400/25 bg-yellow-400/10 px-12 py-6">
              <p className="mb-2 text-[0.8rem] tracking-0.05em text-[#777777]">
                PRACTICE UNLOCKS IN
              </p>

              <p className="font-['Fira_Code'] text-[3rem] font-bold tracking-0.05em text-yellow-400">
                {formatted}
              </p>
            </div>

            <button
              onClick={onReturnToMenu}
              className="mx-auto block cursor-pointer rounded-xl border border-white/15 bg-white/10 px-8 py-3 text-[0.95rem] font-semibold text-white transition-colors duration-200 hover:bg-white/15"
            >
              Back to Menu
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 w-full max-w-480px rounded-3xl border border-green-500/30 bg-[rgba(30,41,59,0.5)] px-10 py-12 text-center shadow-2xl backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                delay: 0.1,
              }}
              className="mb-4 text-[3.5rem]"
            >
              🎉
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-2 text-[1.8rem] font-bold text-green-500"
            >
              Practice Unlocked!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-8 text-[0.95rem] leading-relaxed text-[#777777]"
            >
              Hope you feel refreshed! Head back to the menu and give it another
              shot.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              onClick={onReturnToMenu}
              className="mx-auto block cursor-pointer rounded-xl bg-green-500 px-8 py-3 text-[0.95rem] font-semibold text-white transition-colors duration-200 hover:bg-green-600"
            >
              Back to Menu
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CooldownScreen;