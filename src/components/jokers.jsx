export default function Jokers({ usedFiftyFifty, usedSkip, onFiftyFifty, onSkip }) {
    return (
      <div className="jokers">
        <button
          className={`joker-btn ${usedFiftyFifty ? "used" : ""}`}
          onClick={onFiftyFifty}
          disabled={usedFiftyFifty}
        >
          50:50
        </button>
        <button
          className={`joker-btn ${usedSkip ? "used" : ""}`}
          onClick={onSkip}
          disabled={usedSkip}
        >
          Preskoči pitanje
        </button>
      </div>
    )
  }