/**
 * Components - Module - Hooks - useCreate - Types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Module } from '.'
import { UseHookOutput } from '../general'

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
