/**
 * Click counter utility for tracking button clicks
 */

export class ClickCounter {
  private count: number = 0
  private label: string

  constructor(label: string = 'Button') {
    this.label = label
  }

  /**
   * Increment the counter and log to console
   */
  increment(): number {
    this.count++
    console.log(`${this.label} clicked: ${this.count} times`)
    return this.count
  }

  /**
   * Get the current count
   */
  getCount(): number {
    return this.count
  }

  /**
   * Reset the counter
   */
  reset(): void {
    this.count = 0
    console.log(`${this.label} counter reset`)
  }
}

/**
 * Create a click handler function that logs click count
 */
export const createClickCounterHandler = (label?: string) => {
  const counter = new ClickCounter(label)
  return {
    handleClick: () => counter.increment(),
    getCount: () => counter.getCount(),
    reset: () => counter.reset(),
  }
}

