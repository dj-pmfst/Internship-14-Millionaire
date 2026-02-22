export default function StartScreen({ onStart }) {
    return (
      <div className="start-screen">
        <h1>Who wants to be a millionaire?</h1>
        <button className="restart-btn" onClick={onStart}>Start</button>
      </div>
    )
  }