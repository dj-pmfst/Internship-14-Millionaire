import startSound from "../assets/audio/start.mp3"

export default function StartScreen({ onStart }) {
    function handleClick() {
        const audio = new Audio(startSound)
        audio.play()
        onStart()
      }

    return (
      <div className="start-screen">
        <h1>Who wants to be a millionaire?</h1>
        <button className="restart-btn" onClick={handleClick}>Start</button>
      </div>
    )
  }