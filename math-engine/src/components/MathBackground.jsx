function MathBackground() {
  return (
    <>
      {/* SVG Pattern */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <img
          src="/Background.svg"
          alt=""
          className="h-full w-full object-cover opacity-50"
        />
      </div>

      {/* Radial Gradient */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(30,58,138,0.15)_0%,rgba(15,23,42,0.6)_100%)]"
      />
    </>
  );
}

export default MathBackground;