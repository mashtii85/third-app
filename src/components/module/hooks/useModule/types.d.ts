/**
 * Components - Module - Hooks - types
 */

// Types
import { Module } from '../../../../types/module.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'

export interface ModuleFilter {
  courseId: number
  title: string
  description: string
  status: STATUS_ACTIVE
}

export interface ModuleDataList {
  module: Module[]
}
