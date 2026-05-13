import {motion} from "framer-motion"

function ModeCard({ title, subtitle, description, buttonLabel, onClick, disabled, badge }){
    return(
        <motion.div
            whileHover={!disabled ? { scale: 1.04, y: -6} : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
                flex: 1, 
                borderRadius: "24px",
                padding: "40px 32px",
                background: disabled
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,255,255,0.06)",
                backdropFilter: "blur(4px)",
                border: disabled
                    ? "none"
                    : "0 25px 50px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "16px",
                opacity: disabled ? 0.4 : 1,
                cursor: disabled ? "not-allowed" : "pointer",
                transition: "opacity 0.3s   "
            }}>
                <div style={{ fontSize: "3rem"}}>
                    {title === "Nomal Mode" ? "⚔️" : "🔄"}
                </div>
                <h2 style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#F2F0EF",
                    margin: 0
                }}>
                    {title}
                </h2>

                {subtitle && (
                    <p style = {{
                        fontSize: "0.85rem",
                        color: "#777777",
                        margin: 0
                    }}>
                        {subtitle}
                    </p>
                )}

                {badge && (
                    <div style={{
                        background: "rgba(250, 204, 21, 0.15)",
                        border: "1px solid rgba(250, 204, 21, 0.3)",
                        borderRadius: "99px",
                        padding: "4px 14px",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        color: "#FACC15"
                    }}>
                        {badge}
                    </div>
                )}

                <p style={{
                    fontSize: "0.9rem",
                    color: "#F2F0EF",
                    opacity: 0.6,
                    margin: 0,
                    lineHeight: 1.6,
                    flexGrow: 1
                }}>
                    {description}
                </p>

                <motion.button
                    whileHover={!disabled ? { background: "#60A5FA" } : {}}
                    onClick={!disabled ? onClick : undefined}
                    style={{
                    background: disabled ? "#444" : "#3B82F6",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    padding: "12px 36px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: disabled ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                    marginTop: "8px"
                    }}>
                        {buttonLabel}
                </motion.button>
            </motion.div>
    )
}

export default ModeCard