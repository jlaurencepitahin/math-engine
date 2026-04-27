function MathBackground() {
  return (
    <>
      {/* SVG pattern */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden"
      }}>
        <img
          src="/Background.svg"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.5
          }}
        />
      </div>

      {/* Radial gradient — darker edges, lighter center */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "radial-gradient(ellipse at center, rgba(30,58,138,0.15) 0%, rgba(15,23,42,0.6) 100%)"
      }} />
    </>
  )
}

export default MathBackground