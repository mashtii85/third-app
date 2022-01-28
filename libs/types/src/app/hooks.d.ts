/**
 * Services - App - Hooks - Types
 */

// Types
import { QueryLazyOptions } from '@apollo/client'
import { AppSettings } from '.'
import { UseHookOutput } from '..'

export interface UseAppSettingsOutput extends UseHookOutput {
  appSettings: AppSettings
  getSettings: (options?: QueryLazyOptions<{ client_id: number }> | undefined) => void
}
