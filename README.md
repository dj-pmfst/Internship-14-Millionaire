# Who Wants to Be a Millionaire?

Homework 14 - React based "Who wants to ba a millionaire?" web game

## Features

- 10 questions randomly selected from a pool of 20
- Answer order shuffled on every game
- Prize ladder with 10 levels up to 500.000 €
- Safe level at 5.000 € — kept on wrong answer after level 5
- Two jokers per game:
  - **50:50** — removes two wrong answers
  - **Skip** — skips the current question

## Tech Stack

- React
- Vite
- Plain CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)

### Installation

1. Clone the repository

2. Navigate into the project folder

3. Install dependencies

4. Start the development server

5. Open your browser at `http://localhost:5173`

## Build for Production
```
npm run build
```

## Project Structure
```
src/
  assets/          # images, audio, video
  components/
    StartScreen.jsx
    QuestionPanel.jsx
    LevelsList.jsx
    Jokers.jsx
    EndScreen.jsx
    WinScreen.jsx
  questions.js     
  constants.js    
  App.jsx
  App.css
```
