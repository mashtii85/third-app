/**
 * Types - Course
 */

import { Module } from './module'
import { Medium } from './medium'
import { AggregateData } from './aggregateData.d'

export interface CustomFields {
  author: string
}

export interface Course {
  id?: number
  title: string
  description?: string
  customFields: CustomFields
  length?: string
  media?: Medium[]
  modules?: Module[]
  enrolled: AggregateData
}
