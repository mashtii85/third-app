/**
 * Components - Modules - Hooks - useUpdate - Types.d
 */

// Types.d
import { Module } from '../../../../types/module.d'
import { UseHookOutput } from '../../../../types/hook.d'

export interface SwapModulesProps {
  downId: number
  downOrdering: number
  upId: number
  upOrdering: number
}

export interface ModuleUpdateData {
  module: Module
}

export interface UseUpdateModuleOutput extends UseHookOutput {
  updateModule: any
}
