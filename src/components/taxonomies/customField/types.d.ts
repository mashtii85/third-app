/**
 * Components - Courses - Form - Add - types.d
 */
import { Control, FieldErrors } from 'react-hook-form'

import { LooseObject } from '../../../types/object.d'

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
  defaultValue?: LooseObject
}
