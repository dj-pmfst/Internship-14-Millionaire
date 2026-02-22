import startSound from "../assets/audio/start.mp3"
import image from "../assets/who-wants-to-be-a-millionaire.svg"
import bgVideo from "../assets/bg.mp4"

export default function StartScreen({ onStart }) {
    function handleClick() {
        const audio = new Audio(startSound)
        audio.play()
        onStart()
      }

    return (
      <div className="start-screen">
        <video className="bg-video" autoPlay loop muted playsInline>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <img src={image} alt="logo" />
        <button className="restart-btn" onClick={handleClick}>Start</button>
      </div>
    )
  }