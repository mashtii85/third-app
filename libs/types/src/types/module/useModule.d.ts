/**
 * Components - Module - Hooks - types
 */

// Types
import { Module } from '.'
import { STATUS_ACTIVE } from '../general'

export interface ModuleFilter {
  courseId: number
  title: string
  description: string
  status: STATUS_ACTIVE
}

export interface ModuleDataList {
  module: Module[]
}
