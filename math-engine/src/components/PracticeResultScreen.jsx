import { motion } from "framer-motion";
import MathBackground from "./MathBackground";

function PracticeResultScreen({ onRetry, onMenu, score}){
    return (
        <div style ={{
            width: "100vw",
            height: "100vh",
            background: "#0F172A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            position: "relative"
        }}>
        <MathBackground/>

        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                maxWidth: "480px",
                borderRadius: "24px",
                padding: "48px 40px",
                background: "rgba(30, 41, 59, 0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
                textAlign: "center"
            }}
            >
            {/* Icon */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
                >
                💀
            </motion.div>
            
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: 10}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    color: "#EF4444",
                    marginBottom: "8px"
                }}
            >
                You Struggled with this One
            </motion.h2>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{
                    fontSize: "0.95rem",
                    color: "#777777",
                    marginBottom: "32px",
                    lineHeight: 1.6
                }}
            >
                You made 3 or more mistakes on this problem.
                Want to try again or come back later?
            </motion.p>

            {/* Score */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    borderRadius: "12px",
                    padding: "12px 24px",
                    marginBottom: "32px",
                    display: "inline-block"
                }}
                >
                <p style={{
                    fontSize: "0.8rem",
                    color: "#777777",
                    margin: "0 0 4px 0"
                }}>
                    Current Score
                </p>
                <p style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#FACC15",
                    margin: 0,
                    fontFamily: "'Fira Code', monospace"
                }}>
                    {score}
                </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center"
                }}
                >
                <button
                    onClick={onMenu}
                    style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    padding: "12px 28px",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background 0.2s"
                    }}
                    onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.15)"}
                    onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.08)"}
                >
                    Menu
                </button>

                <button
                    onClick={onRetry}
                    style={{
                    background: "#3B82F6",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    padding: "12px 28px",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background 0.2s"
                    }}
                    onMouseEnter={e => e.target.style.background = "#60A5FA"}
                    onMouseLeave={e => e.target.style.background = "#3B82F6"}
                >
                    ⚔️ Retry
                </button>
                </motion.div>
        </motion.div>
        </div>
    )
}

export default PracticeResultScreen