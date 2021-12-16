/**
 * Services - App - Hooks - Types
 */

import { QueryLazyOptions } from '@apollo/client'
import { UseHookOutput } from '../../../types/hook'
import { AppSettings } from '../types'

export interface UseAppSettingsOutput extends UseHookOutput {
  appSettings: AppSettings
  getSettings: (options?: QueryLazyOptions<{ client_id: number }> | undefined) => void
}
