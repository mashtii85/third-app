/**
 * Types - Course
 */

import { Module } from './module'

export interface Course {
  id: number
  title: string
  description?: string
  author?: string
  length?: string
  modules?: Module[]
}
