function QuestionDisplay({ question, prompt }) {
    return (
        <div className="flex flex-col items-center text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
                {question}
            </h2>
            <p style={{ color: "#F2F0EF" }} className="text-base opacity-80">
                {prompt}
            </p>
        </div>
    )
}

export default QuestionDisplay