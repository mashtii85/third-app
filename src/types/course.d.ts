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
  course_enrollments?: CourseEnrollment[]
}
