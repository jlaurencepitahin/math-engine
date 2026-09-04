import { motion } from "framer-motion";
import { useState } from "react";
import ModeCard from "./ModeCard";
import MathBackground from "./MathBackground";
import BreakWarningPopup from "./BreakWarningPopup";

function MenuScreen({
  onSelectNormal,
  onSelectPractice,
  wrongProblemsCount,
  cooldownEndTime,
}) {
  const [showBreakWarning, setShowBreakWarning] = useState(false);
  const hasPracticeProblems = wrongProblemsCount > 0;

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center gap-12 bg-primary px-6 py-10">
      <MathBackground />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <h1 className="mb-2 text-6xl font-bold tracking-[-0.02em] text-white">
          ⚔️ Mathventure
        </h1>

        <p className="text-base text-grey">
          Conquer math one problem at a time
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: "easeOut",
        }}
        className="relative z-10 flex w-full max-w-190 flex-col gap-6 md:flex-row"
      >
        <ModeCard
          title="Normal Mode"
          subtitle="Derivatives — Power Rule"
          description="Work through all problems step by step. Wrong answers are tracked and sent to Practice Mode."
          buttonLabel="Play"
          onClick={() => {
            if (cooldownEndTime && cooldownEndTime > Date.now()) {
              setShowBreakWarning(true);
            } else {
              onSelectNormal();
            }
          }}
        />

        <ModeCard
          title="Practice Mode"
          subtitle={
            hasPracticeProblems
              ? "Problems waiting"
              : "Nothing here yet"
          }
          description={
            hasPracticeProblems
              ? "Retry the problems you struggled with. Clear your queue and master the material."
              : "Play Normal Mode first. Problems you struggle with will appear here."
          }
          badge={
            hasPracticeProblems
              ? `${wrongProblemsCount} problem${
                  wrongProblemsCount > 1 ? "s" : ""
                } to retry`
              : null
          }
          buttonLabel="Practice"
          onClick={onSelectPractice}
          disabled={!hasPracticeProblems}
        />
      </motion.div>

      {showBreakWarning && (
        <BreakWarningPopup
          onContinue={() => {
            setShowBreakWarning(false);
            onSelectNormal();
          }}
          onBack={() => setShowBreakWarning(false)}
        />
      )}
    </div>
  );
}

export default MenuScreen;