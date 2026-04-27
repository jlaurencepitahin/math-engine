function HintBox({ hint }) {
  return (
    <div style={{
      padding: "16px"
    }}>
      <p style={{
        color: "#60A5FA",
        fontSize: "0.8rem",
        fontWeight: "600",
      }}>
        Hint
      </p>
      <p style={{
        color: "#F2F0EF",
        fontSize: "0.85rem",
        margin: 0
      }}>
        {hint}
      </p>
    </div>
  )
}

export default HintBox