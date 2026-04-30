import React, { useState, useCallback } from 'react'
import StartScreen from './screens/StartScreen.jsx'
import Level1 from './screens/Level1.jsx'
import Level2 from './screens/Level2.jsx'
import Level3 from './screens/Level3.jsx'
import Level4 from './screens/Level4.jsx'
import Level5 from './screens/Level5.jsx'
import WinScreen from './screens/WinScreen.jsx'

const TOTAL_LEVELS = 5

export default function App() {
  const [gameState, setGameState] = useState('start') // start | level1..5 | win
  const [lives, setLives] = useState(3)
  const [stars, setStars] = useState(0)
  const [paused, setPaused] = useState(false)

  const goToLevel = useCallback((level) => {
    setGameState(`level${level}`)
    setPaused(false)
  }, [])

  const nextLevel = useCallback((earnedStars = 0) => {
    setStars(s => s + earnedStars)
    const currentLevel = parseInt(gameState.replace('level', ''))
    if (currentLevel >= TOTAL_LEVELS) {
      setGameState('win')
    } else {
      setGameState(`level${currentLevel + 1}`)
    }
  }, [gameState])

  const loseLife = useCallback(() => {
    setLives(l => {
      const newLives = l - 1
      if (newLives <= 0) {
        // Reset with 3 lives, restart level
        setTimeout(() => setLives(3), 100)
        return 3
      }
      return newLives
    })
  }, [])

  const resetGame = useCallback(() => {
    setGameState('start')
    setLives(3)
    setStars(0)
    setPaused(false)
  }, [])

  const currentLevel = gameState.startsWith('level')
    ? parseInt(gameState.replace('level', ''))
    : 0

  const sharedProps = {
    lives,
    stars,
    paused,
    setPaused,
    loseLife,
    nextLevel,
    resetGame,
    currentLevel,
    totalLevels: TOTAL_LEVELS,
  }

  return (
    <div className="game-container">
      {gameState === 'start' && <StartScreen onStart={() => goToLevel(1)} />}
      {gameState === 'level1' && <Level1 {...sharedProps} />}
      {gameState === 'level2' && <Level2 {...sharedProps} />}
      {gameState === 'level3' && <Level3 {...sharedProps} />}
      {gameState === 'level4' && <Level4 {...sharedProps} />}
      {gameState === 'level5' && <Level5 {...sharedProps} />}
      {gameState === 'win' && <WinScreen stars={stars} onReplay={resetGame} />}
    </div>
  )
}
