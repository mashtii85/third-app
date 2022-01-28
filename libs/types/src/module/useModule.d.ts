/**
 * Components - Module - Hooks - types
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Module } from '.'

export interface ModuleFilter {
  courseId: number
  title: string
  description: string
  status: STATUS_ACTIVE
}

export interface ModuleDataList {
  module: Module[]
}
