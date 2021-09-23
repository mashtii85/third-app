/**
 * Types - Course
 */

import { Module } from './module'
import { Medium } from './medium'
import { AggregateData } from './aggregateData.d'
import { STATUS_ACTIVE } from './select.d'
import { CourseEnrollment } from './courseEnrollment.d'

export interface CustomFields {
  author?: string
}

interface CourseEnrolment {
  created_at: string
  id: number
  status: STATUS_ACTIVE
  updated_at: string
}
export interface Course {
  id?: number
  title: string
  description?: string
  custom_fields?: CustomFields
  length?: string
  media?: Medium[]
  modules?: Module[]
  enrolled: AggregateData
  status: STATUS_ACTIVE
  taxonomy_id?: number
  course_enrollments?: CourseEnrollment[]
}
