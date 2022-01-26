/**
 * Components - Courses - Forms - Upsert - types.d
 */
import { Control, FieldErrors } from 'react-hook-form'

import { CourseFilter } from './hooks'
import { LooseObject } from '../../../../types/object'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { Options } from '../../../../types/options'

export interface CourseFormType {
  id: number
  title: string
  description: string
  status: STATUS_ACTIVE
  taxonomy: Options
  custom_fields: LooseObject
}

export interface CourseFormSubmission extends CourseFormType {
  taxonomy?: Options
}

export interface CourseFormProps {
  onSuccess: () => void
  filters: Partial<CourseFilter>
  defaultValues?: Partial<CourseFormType>
}

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
