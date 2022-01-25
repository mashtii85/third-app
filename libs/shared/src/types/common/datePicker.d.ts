/**
 * Components - Common - DatePicker - Types
 */

// React hook form
import { Control, FieldErrors } from 'react-hook-form'

export interface DatePickerProps {
  name: string
  control: Control
  errors: FieldErrors
  register: any
  dateFormat: string
  minDate: Date
  maxDate: Date
  onChange: (date: Date) => void
  filterDate: (date: Date) => boolean
  filterTime: (time: Date) => boolean
  showTimeSelect: boolean
  todayButton: boolean
  space: boolean
}
