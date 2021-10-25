/**
 * Components - Events - Calendar - Helpers
 */

import { THEME_CONTEXT } from '../../../constants/themeContext'
import { CALENDAR_STATUS, Event } from '../types.d'
import { CalendarType } from './types.d'

export const prepareEventColor = (status: CALENDAR_STATUS): THEME_CONTEXT => {
  switch (status) {
    case CALENDAR_STATUS.Cancelled:
      return THEME_CONTEXT.warning
    case CALENDAR_STATUS.Completed:
      return THEME_CONTEXT.success
    case CALENDAR_STATUS.Pending:
      return THEME_CONTEXT.info
    case CALENDAR_STATUS.Started:
      return THEME_CONTEXT.primary
    default:
      return THEME_CONTEXT.black
  }
}

export const prepareCalendarEvents = (events: Event[]): CalendarType[] => {
  const list = events.map((event) => {
    return {
      title: event.title,
      start: event.start_at,
      end: event.end_at ?? event.start_at,
      color: prepareEventColor(event.status)
    }
  })
  return list
}
