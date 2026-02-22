export default function EndScreen({ winnings, onRestart }) {
    return (
      <div className="end-screen">
        <h1>Game Over</h1>
        <p className="winnings-label">You won</p>
        <p className="winnings-amount">{winnings}</p>
        <button className="restart-btn" onClick={onRestart}>Play again</button>
      </div>
    )
  }