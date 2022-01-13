/**
 * Components - Dashboard - Tiles - Overview - GetDates
 */

// Date FNS
import {
  addMonths,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear
} from 'date-fns'

export const getDates = (): any => {
  const today = new Date()
  const monthEnd = endOfMonth(new Date())
  const monthStart = startOfMonth(new Date())
  const previousMonth = new Date()
  previousMonth.setMonth(previousMonth.getMonth() - 1)
  const previousMonthEnd = endOfMonth(previousMonth)
  const previousMonthStart = startOfMonth(previousMonth)
  const previousYear = new Date()
  previousYear.setFullYear(previousYear.getFullYear() - 1)
  const previousYearEnd = endOfYear(previousYear)
  const previousYearStart = startOfYear(previousYear)
  const todayStart = startOfDay(new Date())
  const todayEnd = endOfDay(new Date())
  const weekEnd = endOfWeek(new Date())
  const weekStart = startOfWeek(new Date())
  const yearEnd = endOfYear(new Date())
  const yearStart = startOfYear(new Date())
  const nextThreeEnd = endOfMonth(addMonths(new Date(monthStart), 2))

  return {
    monthEnd,
    monthStart,
    nextThreeEnd,
    previousMonth,
    previousMonthEnd,
    previousMonthStart,
    previousYear,
    previousYearEnd,
    previousYearStart,
    today,
    todayEnd,
    todayStart,
    weekEnd,
    weekStart,
    yearEnd,
    yearStart
  }
}
