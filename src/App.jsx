import { useState } from "react"
import { questions } from "./questions"
//import { levels } from "./constants"

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

function handleAnswer(index) {
  const question = selectedQuestions[currentLevel]
  const isCorrect = index === question.correct

  setSelectedAnswer(index)
  setAnswerState(isCorrect ? "correct" : "wrong")

  setTimeout(() => {
    if (isCorrect) {
      if (currentLevel === 9) {
        setGamePhase("won")
      } else {
        setCurrentLevel((prev) => prev + 1)
        setAnswerState(null)
        setSelectedAnswer(null)
        setHiddenAnswers([])
      }
    } else {
      setGamePhase("lost")
    }
  }, 1500)
}

function handleFiftyFifty() {
  const question = selectedQuestions[currentLevel]
  const wrongIndices = question.answers
    .map((_, i) => i)
    .filter((i) => i !== question.correct && !hiddenAnswers.includes(i))
  const shuffled = wrongIndices.sort(() => Math.random() - 0.5)
  setHiddenAnswers(shuffled.slice(0, 2))
  setUsedFiftyFifty(true)
}

function handleSkip() {
  setUsedSkip(true)
  setHiddenAnswers([])
  setAnswerState(null)
  setSelectedAnswer(null)
  if (currentLevel === 9) {
    setGamePhase("won")
  } else {
    setCurrentLevel((prev) => prev + 1)
  }
}

function getWinnings() {
  if (currentLevel >= 5) return "5.000 €"
  return "0 €"
}