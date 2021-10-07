/**
 * Components - module - Hooks - useDelete - Types.d
 */

// Types.d
import { Module } from '../../../../types/module.d'
import { UseHookOutput, UseHookProps } from '../../../../types/hook.d'
import { ModuleFilter } from '../useModule/types.d'

export interface ModuleDeleteVariables {
  id: number
}

export interface ModuleDeleteData {
  module: Module
}

export interface useDeletemoduleProps extends UseHookProps<ModuleDeleteData> {
  filters: ModuleFilter
  id: number
}

export interface UseDeleteModuleOutput extends UseHookOutput {
  deleteModule: any
}

interface ModuleDeleteProps {
  id: number
  courseId: number
}
