/**
 * Components - Module - Hooks - useUpdate - Types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Module } from '.'
import { UseHookOutput } from '../general'

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
