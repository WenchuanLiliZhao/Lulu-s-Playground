import { useState, useRef, useEffect, type ReactNode } from 'react'
import { Icon } from '../Icon'
import styles from './_styles.module.scss'

export interface DropdownProps {
  /**
   * Trigger content (text or element)
   */
  trigger: ReactNode
  /**
   * Dropdown content
   */
  children: ReactNode
  /**
   * Whether the dropdown is in active state (e.g., has filters applied)
   */
  isActive?: boolean
  /**
   * Optional className
   */
  className?: string
}

export const Dropdown = ({
  trigger,
  children,
  isActive = false,
  className = '',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`${styles.container} ${className}`} ref={dropdownRef}>
      <button
        className={`${styles.trigger} ${isActive ? styles.active : ''} ${isOpen ? styles.open : ''}`}
        onClick={toggleDropdown}
        type="button"
      >
        <span className={styles.triggerContent}>{trigger}</span>
        <Icon icon={isOpen ? 'expand_less' : 'expand_more'} className={styles.icon} />
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          {children}
        </div>
      )}
    </div>
  )
}

