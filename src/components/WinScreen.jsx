export default function WinScreen({ onRestart }) {
    return (
      <div className="end-screen">
        <h1>Congratulations!</h1>
        <p className="winnings-label">You won</p>
        <p className="winnings-amount">500.000 €</p>
        <button className="restart-btn" onClick={onRestart}>Play again</button>
      </div>
    )
  }