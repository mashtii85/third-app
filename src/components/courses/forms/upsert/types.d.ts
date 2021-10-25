/**
 * Components - Courses - Forms - Upsert - types.d
 */
import { Control, FieldErrors } from 'react-hook-form'

import { CourseFilter } from '../../hooks/types'
import { LooseObject } from '../../../../types/object'
import { Course } from '../../../../types/course'

import { STATUS_ACTIVE } from '../../../../types/select'
import { Options } from '../../../../types/options'

export interface CourseFormType {
  title: string
  description: string
  status: STATUS_ACTIVE
}

export interface CourseFormSubmission extends CourseFormType {
  taxonomy?: Options
}

export interface CourseFormProps {
  onSuccess: () => void
  filters: Partial<CourseFilter>
  defaultValues?: Course | LooseObject
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
