/**
 * Components - Module - Hooks - useCreate - Types.d
 */

// Types
import { Module } from '.'
import { STATUS_ACTIVE, UseHookOutput } from '../general'

export interface ModuleCreateType {
  courseId: number
  title: string
  description: string
  ordering?: number
  status: STATUS_ACTIVE
}

export interface ModuleCreateData {
  module: { returning: Module[] }
}

export interface UseCreateModuleOutput extends UseHookOutput {
  createModule: any
}
