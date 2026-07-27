import { motion } from "framer-motion";

function ModeCard({
  title,
  subtitle,
  description,
  buttonLabel,
  onClick,
  disabled,
  badge,
}) {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.04, y: -6 } : {}}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex flex-1 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } flex-col items-center gap-4 rounded-3xl border p-10 text-center backdrop-blur-xl transition-opacity ${
        disabled
          ? "border-white/5 bg-white/5 opacity-40 shadow-none"
          : "border-white/10 bg-white/10 opacity-100 shadow-2xl"
      }`}
    >
      {/* Icon */}
      <div className="text-5xl">
        {title === "Normal Mode" ? "⚔️" : "🔄"}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-[#F2F0EF]">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-[0.85rem] text-[#777777]">
          {subtitle}
        </p>
      )}

      {/* Badge */}
      {badge && (
        <div className="rounded-full border border-yellow-400/30 bg-yellow-400/15 px-3.5 py-1 text-[0.8rem] font-semibold text-yellow-400">
          {badge}
        </div>
      )}

      {/* Description */}
      <p className="flex-grow text-[0.9rem] leading-relaxed text-[#F2F0EF] opacity-60">
        {description}
      </p>

      {/* Button */}
      <motion.button
        whileHover={!disabled ? { background: "#60A5FA" } : {}}
        onClick={!disabled ? onClick : undefined}
        className={`mt-2 rounded-xl px-9 py-3 text-base font-semibold text-white transition-colors ${
          disabled
            ? "cursor-not-allowed bg-[#444]"
            : "cursor-pointer bg-blue-500"
        }`}
      >
        {buttonLabel}
      </motion.button>
    </motion.div>
  );
}

export default ModeCard;