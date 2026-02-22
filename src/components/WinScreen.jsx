import winSound from "../assets/audio/win.mp3"

export default function WinScreen({ onRestart }) {
    const audio = new Audio(winSound)
    audio.play()
    return (
      <div className="end-screen">
        <h1>CONGRATULATIONS!</h1>
        <p className="winnings-label">You won</p>
        <p className="winnings-amount">500.000 €</p>
        <button className="restart-btn" onClick={onRestart}>Play again</button>
      </div>
    )
  }