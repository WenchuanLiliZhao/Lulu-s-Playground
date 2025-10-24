import { useState, useMemo } from 'react'
import type { EventData } from '../../data/eventData'

export type EventChannel = 'Retail' | 'EC'

export interface EventFilterState {
  retail: boolean
  ec: boolean
}

export const useEventFilter = (events: EventData[]) => {
  const [filterState, setFilterState] = useState<EventFilterState>({
    retail: true,
    ec: true,
  })

  // Filter events based on channel selection
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      if (!event.channel) return true
      if (event.channel === 'Retail') return filterState.retail
      if (event.channel === 'EC') return filterState.ec
      return true
    })
  }, [events, filterState])

  // Check if any filter is active (not all channels selected)
  const isFilterActive = useMemo(() => {
    return !filterState.retail || !filterState.ec
  }, [filterState])

  const toggleChannel = (channel: EventChannel) => {
    setFilterState(prev => ({
      ...prev,
      [channel.toLowerCase()]: !prev[channel.toLowerCase() as keyof EventFilterState],
    }))
  }

  const resetFilter = () => {
    setFilterState({
      retail: true,
      ec: true,
    })
  }

  return {
    filterState,
    filteredEvents,
    isFilterActive,
    toggleChannel,
    resetFilter,
  }
}

