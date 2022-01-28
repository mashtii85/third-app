/**
 * Components - module - Hooks - useDelete - Types.d
 */

// Types
import { Module, ModuleFilter } from '.'
import { UseHookOutput, UseHookProps } from '../general'

export interface ModuleDeleteVariables {
  id: number
}

export interface ModuleDeleteData {
  module: Module
}

export interface useDeleteModuleProps extends UseHookProps<ModuleDeleteData> {
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
