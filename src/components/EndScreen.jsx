import startSound from "../assets/audio/start.mp3"

export default function EndScreen({ winnings, onRestart }) {
  function handleClick() {
    const audio = new Audio(startSound)
    audio.play()
    onRestart()
  }
    return (
      <div className="end-screen">
        <h1>Game Over</h1>
        <p className="winnings-label">You won</p>
        <p className="winnings-amount">{winnings}</p>
        <button className="restart-btn" onClick={handleClick}>Play again</button>
      </div>
    )
  }