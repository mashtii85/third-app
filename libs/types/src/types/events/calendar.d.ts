/**
 * Components - Events - Calendar - Types.d
 */

import { ThemeContext } from '../../../config/types.d'

export interface CalendarType {
  title: string
  start?: Date
  end?: Date
  color: string | ThemeContext
}
