/**
 * Components - Module - Hooks - useUpdate - Types.d
 */

// Types.d
import { Module } from '../../../../types/module.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { UseHookOutput } from '../../../../types/hook.d'

export interface ModuleUpdateVariables {
  id: number
  changes: {
    title: string
    description: string
    ordering?: number
    status: STATUS_ACTIVE
  }
}

export interface ModuleUpdateData {
  module: Module
}

export interface UseUpdateModuleOutput extends UseHookOutput {
  updateModule: any
}
