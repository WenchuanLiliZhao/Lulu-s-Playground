import { useState } from 'react'
import { Button } from './components'
import styles from './styles/App.module.scss'
import SnakeGame from './playground/SnakeGame'

type DemoType = 'components' | 'snake'

function App() {
  const [currentDemo, setCurrentDemo] = useState<DemoType>('components')

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Lululemon UI Playground</h1>
        <p className={styles.description}>Development environment for testing components and demos</p>
      </header>

      <nav className={styles.nav}>
        <Button 
          variant={currentDemo === 'components' ? 'primary' : 'outline'}
          onClick={() => setCurrentDemo('components')}
        >
          Components
        </Button>
        <Button 
          variant={currentDemo === 'snake' ? 'primary' : 'outline'}
          onClick={() => setCurrentDemo('snake')}
        >
          Snake Game Demo
        </Button>
      </nav>

      <main className={styles.main}>
        {currentDemo === 'components' && (
          <div className={styles.section}>
            <h2 className={styles.subtitle}>Button Component</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button variant="primary" size="small">Small Primary</Button>
              <Button variant="primary" size="medium">Medium Primary</Button>
              <Button variant="primary" size="large">Large Primary</Button>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        )}

        {currentDemo === 'snake' && (
          <div className={styles.section}>
            <SnakeGame />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
