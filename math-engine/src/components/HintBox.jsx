function HintBox({ hint }) {
  return (
    <div className="box-border rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.85)] p-4 backdrop-blur-xl">
      <p className="mb-2 text-[0.8rem] font-semibold text-[#60A5FA]">
        Hint
      </p>

      <p className="text-[0.85rem] leading-[1.6] text-[#F2F0EF]">
        {hint}
      </p>
    </div>
  );
}

export default HintBox