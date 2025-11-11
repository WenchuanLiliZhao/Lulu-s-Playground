import { createPortal } from 'react-dom'
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import styles from './_styles.module.scss'

export type PopupPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

export interface PopupProps {
  /**
   * Controls whether the popup is visible
   */
  isOpen: boolean
  /**
   * Optional reference element to anchor the popup
   */
  anchorEl?: HTMLElement | null
  /**
   * Callback fired when popup requests to close
   */
  onClose?: () => void
  /**
   * Popup content
   */
  children: ReactNode
  /**
   * Custom class name for additional styling
   */
  className?: string
  /**
   * Distance in pixels between the popup and anchor
   * @default 8
   */
  offset?: number
  /**
   * Placement relative to the anchor
   * @default 'bottom-start'
   */
  placement?: PopupPlacement
  /**
   * Whether to close on outside click
   * @default true
   */
  closeOnOutsideClick?: boolean
}

const DEFAULT_OFFSET = 8
const DEFAULT_PLACEMENT: PopupPlacement = 'bottom-start'

export const Popup = ({
  isOpen,
  anchorEl,
  onClose,
  children,
  className = '',
  offset = DEFAULT_OFFSET,
  placement = DEFAULT_PLACEMENT,
  closeOnOutsideClick = true,
}: PopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState<CSSProperties>({})

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useLayoutEffect(() => {
    if (!isOpen || !mounted) return

    const updatePosition = () => {
      if (!anchorEl || !popupRef.current) return

      const anchorRect = anchorEl.getBoundingClientRect()
      const popupRect = popupRef.current.getBoundingClientRect()

      let top = 0
      let left = 0

      const verticalOffset = offset
      // const horizontalOffset = offset

      switch (placement) {
        case 'bottom-start':
          top = anchorRect.bottom + verticalOffset
          left = anchorRect.left
          break
        case 'bottom-end':
          top = anchorRect.bottom + verticalOffset
          left = anchorRect.right - popupRect.width
          break
        case 'top-start':
          top = anchorRect.top - popupRect.height - verticalOffset
          left = anchorRect.left
          break
        case 'top-end':
          top = anchorRect.top - popupRect.height - verticalOffset
          left = anchorRect.right - popupRect.width
          break
        default:
          top = anchorRect.bottom + verticalOffset
          left = anchorRect.left
      }

      const computed: CSSProperties = {
        top: top + window.scrollY,
        left: left + window.scrollX,
      }

      setPosition(computed)
    }

    updatePosition()

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isOpen, mounted, anchorEl, placement, offset])

  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        popupRef.current &&
        !popupRef.current.contains(target) &&
        anchorEl &&
        !anchorEl.contains(target)
      ) {
        onClose?.()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose, anchorEl, closeOnOutsideClick])

  if (!isOpen || !mounted) {
    return null
  }

  return createPortal(
    <div
      ref={popupRef}
      className={`${styles.popup} ${className}`.trim()}
      style={position}
      role="dialog"
      aria-modal="false"
    >
      {children}
    </div>,
    document.body
  )
}

Popup.displayName = 'Popup'


