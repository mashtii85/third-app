/**
 * Types - Course
 */

import { Module } from './module.d'
import { Medium } from './medium.d'

export interface Course {
  progress?: number
  id: number
  title: string
  description?: string
  author?: string
  length?: string
  media?: Medium[]
  modules?: Module[]
}
