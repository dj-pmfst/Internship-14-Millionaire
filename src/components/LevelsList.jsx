import { levels, safe_level } from "../constants"

export default function LevelsList({ currentLevel }) {
  return (
    <div className="levels-list">
      {[...levels].reverse().map((item) => (
        <div
          key={item.level}
          className={`level-item
            ${item.level === currentLevel + 1 ? "current" : ""}
            ${item.level === safe_level ? "safe" : ""}
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