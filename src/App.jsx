import { questions } from "./questions"
import { levels } from "./constants"
import StartScreen from "./components/StartScreen"
import EndScreen from "./components/EndScreen"
import WinScreen from "./components/WinScreen"
import QuestionPanel from "./components/QuestionPanel"
import LevelsList from "./components/LevelsList"
import Jokers from "./components/Jokers"
import "./App.css"
import questionSound from "./assets/audio/waiting.mp3"
import { useState, useRef } from "react"
import correctSound from "./assets/audio/correct.mp3"
import wrongSound from "./assets/audio/wrong.mp3"

export default function App() {
  const [gamePhase, setGamePhase] = useState("start")
  const [currentLevel, setCurrentLevel] = useState(0)
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [answerState, setAnswerState] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false)
  const [usedSkip, setUsedSkip] = useState(false)
  const [hiddenAnswers, setHiddenAnswers] = useState([])
  const questionAudioRef = useRef(null)

  function playQuestionSound() {
    if (questionAudioRef.current) {
      questionAudioRef.current.pause()
      questionAudioRef.current.currentTime = 0
    }
    questionAudioRef.current = new Audio(questionSound)
    questionAudioRef.current.play()
  }
  
  function stopQuestionSound() {
    if (questionAudioRef.current) {
      questionAudioRef.current.pause()
      questionAudioRef.current.currentTime = 0
    }
  }

  function getWinnings() {
    if (currentLevel >= 5) return "5.000 €"
    return "0 €"
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
    playQuestionSound()
  }

  function handleAnswer(index) {
    stopQuestionSound()
    const question = selectedQuestions[currentLevel]
    const isCorrect = index === question.correct
  
    setSelectedAnswer(index)
    setAnswerState(isCorrect ? "correct" : "wrong")
  
    if (isCorrect) {
      const audio = new Audio(correctSound)
      audio.play()
    } else {
      const audio = new Audio(wrongSound)
      audio.play()
    }
  
    setTimeout(() => {
      if (isCorrect) {
        if (currentLevel === 9) {
          stopQuestionSound()
          setGamePhase("won")
        } else {
          setCurrentLevel((prev) => prev + 1)
          setAnswerState(null)
          setSelectedAnswer(null)
          setHiddenAnswers([])
          playQuestionSound()
        }
      } else {
        stopQuestionSound()
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

  if (gamePhase === "start") return <StartScreen onStart={startGame} />
  if (gamePhase === "won") return <WinScreen onRestart={startGame} />
  if (gamePhase === "lost") return <EndScreen winnings={getWinnings()} onRestart={startGame} />

  return (
    <div className="game-layout">
      <div className="main-area">
        <Jokers
          usedFiftyFifty={usedFiftyFifty}
          usedSkip={usedSkip}
          onFiftyFifty={handleFiftyFifty}
          onSkip={handleSkip}
        />
        <QuestionPanel
          question={selectedQuestions[currentLevel]}
          hiddenAnswers={hiddenAnswers}
          selectedAnswer={selectedAnswer}
          answerState={answerState}
          onAnswer={handleAnswer}
        />
      </div>
      <LevelsList currentLevel={currentLevel} />
    </div>
  )
}