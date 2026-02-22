import { LEVELS, SAFE_LEVEL } from "../constants"

export default function LevelsList({ currentLevel }) {
  return (
    <div className="levels-list">
      {[...LEVELS].reverse().map((item) => (
        <div
          key={item.level}
          className={`level-item
            ${item.level === currentLevel + 1 ? "current" : ""}
            ${item.level === SAFE_LEVEL ? "safe" : ""}
            ${item.level < currentLevel + 1 ? "completed" : ""}
          `}
        >
          <span className="level-number">{item.level}</span>
          <span className="level-prize">{item.prize}</span>
        </div>
      ))}
    </div>
  )
}