/**
 * Types - Course
 */

import { Module } from './module'
import { Medium } from './medium'

export interface Course {
  progress?: number
  id?: number
  title: string
  description?: string
  author?: string
  length?: string
  media?: Medium[]
  modules?: Module[]
}
