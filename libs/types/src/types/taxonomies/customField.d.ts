/**
 * Components - Courses - Form - Add - types.d
 */

//Types
import { Control, FieldErrors } from 'react-hook-form'
import { LooseObject } from '../general'

interface CustomFieldRenderProps {
  control?: Control
  errors?: FieldErrors
  register?: any
  setFilters?: (value: LooseObject) => void
  input: string
  inputType: string
  name: string
  label: string
  options: any
  withTime: boolean
  defaultValue?: LooseObject
}
