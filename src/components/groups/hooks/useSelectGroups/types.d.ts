/**
 * Components - Groups - Hooks - UseSelectGroups - Types.d
 */

import { UseHookOutput } from '../../../../types/hook'
import { Options } from '../../../../types/options'

export interface GroupSelectDataList {
  options: Options[]
}

export interface UseGroupSelectOutput extends UseHookOutput {
  options: Options[]
}
