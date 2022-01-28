/**
 * Components - Courses - Forms - Upsert - types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

//Types
import { CourseFilter } from '.'
import { Options } from '../general'
import { LooseObject } from '../general'

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
