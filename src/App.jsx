import { useState } from "react"
import { questions } from "./questions"
import { LEVELS } from "./constants"

export default function App() {
  const [gamePhase, setGamePhase] = useState("start")
  const [currentLevel, setCurrentLevel] = useState(0)
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [answerState, setAnswerState] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false)
  const [usedSkip, setUsedSkip] = useState(false)
  const [hiddenAnswers, setHiddenAnswers] = useState([])
}

function startGame() {
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  const picked = shuffled.slice(0, 10)

  const withShuffledAnswers = picked.map((q) => {
    const indexed = q.answers.map((ans, i) => ({ ans, original: i }))
    const shuffledAnswers = indexed.sort(() => Math.random() - 0.5)
    const newCorrect = shuffledAnswers.findIndex((a) => a.original === q.correct)
    return {
      question: q.question,
      answers: shuffledAnswers.map((a) => a.ans),
      correct: newCorrect,
    }
  })

  setSelectedQuestions(withShuffledAnswers)
  setCurrentLevel(0)
  setAnswerState(null)
  setSelectedAnswer(null)
  setUsedFiftyFifty(false)
  setUsedSkip(false)
  setHiddenAnswers([])
  setGamePhase("playing")
}