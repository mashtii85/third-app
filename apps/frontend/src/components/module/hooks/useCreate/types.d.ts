/**
 * Components - Module - Hooks - useCreate - Types.d
 */

// Types.d
import { Module } from '../../../../types/module.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { UseHookOutput } from '../../../../types/hook.d'

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
