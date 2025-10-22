import { useState, useCallback } from 'react'

export interface MonthPopupState {
  isOpen: boolean
  month: number | null
  year: number | null
  sourceElement: HTMLElement | null
}

export const useMonthPopup = () => {
  const [popupState, setPopupState] = useState<MonthPopupState>({
    isOpen: false,
    month: null,
    year: null,
    sourceElement: null,
  })

  const openPopup = useCallback((month: number, year: number, sourceElement: HTMLElement) => {
    setPopupState({
      isOpen: true,
      month,
      year,
      sourceElement,
    })
  }, [])

  const closePopup = useCallback(() => {
    setPopupState({
      isOpen: false,
      month: null,
      year: null,
      sourceElement: null,
    })
  }, [])

  return {
    popupState,
    openPopup,
    closePopup,
  }
}

