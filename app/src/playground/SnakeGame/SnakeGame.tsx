import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '../../components'
import styles from './SnakeGame.module.scss'

type Position = { x: number; y: number }
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION: Direction = 'RIGHT'
const GAME_SPEED = 150

const getRandomFood = (snake: Position[]): Position => {
  let food: Position
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
  } while (snake.some((segment) => segment.x === food.x && segment.y === food.y))
  return food
}

function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION)
  const [food, setFood] = useState<Position>(getRandomFood(INITIAL_SNAKE))
  const [isGameOver, setIsGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const gameLoopRef = useRef<number>(0)
  const directionQueueRef = useRef<Direction[]>([])

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setFood(getRandomFood(INITIAL_SNAKE))
    setIsGameOver(false)
    setIsPaused(false)
    setScore(0)
    directionQueueRef.current = []
  }, [])

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return

    // Get next direction from queue
    if (directionQueueRef.current.length > 0) {
      const nextDirection = directionQueueRef.current.shift()
      if (nextDirection) {
        setDirection(nextDirection)
      }
    }

    setSnake((prevSnake) => {
      const head = prevSnake[0]
      let newHead: Position

      switch (direction) {
        case 'UP':
          newHead = { x: head.x, y: head.y - 1 }
          break
        case 'DOWN':
          newHead = { x: head.x, y: head.y + 1 }
          break
        case 'LEFT':
          newHead = { x: head.x - 1, y: head.y }
          break
        case 'RIGHT':
          newHead = { x: head.x + 1, y: head.y }
          break
      }

      // Check collision with walls
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setIsGameOver(true)
        if (score > highScore) {
          setHighScore(score)
        }
        return prevSnake
      }

      // Check collision with self
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true)
        if (score > highScore) {
          setHighScore(score)
        }
        return prevSnake
      }

      const newSnake = [newHead, ...prevSnake]

      // Check if food is eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(getRandomFood(newSnake))
        setScore((prev) => prev + 10)
        return newSnake
      }

      // Remove tail if no food eaten
      newSnake.pop()
      return newSnake
    })
  }, [direction, food, isGameOver, isPaused, score, highScore])

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (isGameOver) return

      // Pause/Resume with Space
      if (event.key === ' ') {
        event.preventDefault()
        setIsPaused((prev) => !prev)
        return
      }

      const currentDirection = directionQueueRef.current.length > 0 
        ? directionQueueRef.current[directionQueueRef.current.length - 1]
        : direction

      let newDirection: Direction | null = null

      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (currentDirection !== 'DOWN') newDirection = 'UP'
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          if (currentDirection !== 'UP') newDirection = 'DOWN'
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (currentDirection !== 'RIGHT') newDirection = 'LEFT'
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (currentDirection !== 'LEFT') newDirection = 'RIGHT'
          break
      }

      if (newDirection && directionQueueRef.current.length < 2) {
        event.preventDefault()
        directionQueueRef.current.push(newDirection)
      }
    },
    [direction, isGameOver]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    if (!isGameOver && !isPaused) {
      gameLoopRef.current = window.setInterval(moveSnake, GAME_SPEED)
    }
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [moveSnake, isGameOver, isPaused])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>🐍 Snake Game</h2>
        <div className={styles.scores}>
          <div className={styles.score}>Score: {score}</div>
          <div className={styles.highScore}>High Score: {highScore}</div>
        </div>
      </div>

      <div className={styles.gameContainer}>
        <div
          className={styles.grid}
          style={{
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
          }}
        >
          {snake.map((segment, index) => (
            <div
              key={`${segment.x}-${segment.y}-${index}`}
              className={`${styles.cell} ${index === 0 ? styles.head : styles.body}`}
              style={{
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            />
          ))}
          <div
            className={styles.food}
            style={{
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          />
          {isGameOver && (
            <div className={styles.gameOver}>
              <h3>Game Over!</h3>
              <p>Final Score: {score}</p>
            </div>
          )}
          {isPaused && !isGameOver && (
            <div className={styles.paused}>
              <h3>Paused</h3>
              <p>Press SPACE to resume</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.instructions}>
          <h3>Controls:</h3>
          <ul>
            <li><strong>Arrow Keys</strong> or <strong>WASD</strong> - Move</li>
            <li><strong>SPACE</strong> - Pause/Resume</li>
          </ul>
        </div>
        <div className={styles.buttons}>
          {!isGameOver && (
            <Button
              variant="secondary"
              onClick={() => setIsPaused((prev) => !prev)}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
          )}
          <Button variant="primary" onClick={resetGame}>
            {isGameOver ? 'Play Again' : 'Restart'}
          </Button>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.label}>Length:</span>
          <span className={styles.value}>{snake.length}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Speed:</span>
          <span className={styles.value}>{GAME_SPEED}ms</span>
        </div>
      </div>
    </div>
  )
}

export default SnakeGame

