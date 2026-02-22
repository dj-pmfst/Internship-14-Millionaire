const labels = ["A", "B", "C", "D"]

export default function QuestionPanel({ question, hiddenAnswers, selectedAnswer, answerState, onAnswer }) {
  return (
    <div className="question-panel">
      <div className="question-text">{question.question}</div>
      <div className="answers-grid">
        {question.answers.map((answer, index) => {
          if (hiddenAnswers.includes(index)) return <div key={index} className="answer-placeholder" />

          let answerClass = "answer-btn"
          if (answerState !== null) {
            if (index === question.correct) answerClass += " correct"
            else if (index === selectedAnswer) answerClass += " wrong"
          }

          return (
            <button
              key={index}
              className={answerClass}
              onClick={() => onAnswer(index)}
              disabled={answerState !== null}
            >
              <span className="answer-label">{labels[index]}</span>
              {answer}
            </button>
          )
        })}
      </div>
    </div>
  )
}