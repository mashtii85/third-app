/**
 * Types - Course
 */

import { Module } from '../module'
import { Medium } from '../media'
import { STATUS_ACTIVE } from './select.d'
// import { CourseEnrollment } from './courseEnrollment'
import { Taxonomy } from '../taxonomies'
import { Account } from '../accounts'
import { AggregateData } from '../general'
// import { CourseEnrollment } from '../general'

export interface CourseCustomFields {
  author?: string
}

interface CourseEnrolment {
  created_at: string
  id: number
  client_id: number
  status: STATUS_ACTIVE
  updated_at: string
}

export interface Course {
  id?: number
  account_id: number
  account: Account
  title: string
  client_id: number
  description?: string
  custom_fields?: CourseCustomFields
  length?: string
  media?: Medium[]
  modules?: Module[]
  enrolled: AggregateData
  status: STATUS_ACTIVE
  taxonomy_id?: number
  taxonomy: Taxonomy
  course_enrollments?: CourseEnrollment[]
}
