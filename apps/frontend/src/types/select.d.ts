/**
 * Types - Select
 */

import { UseHookOutput } from './hook'
import { Options } from './options'

export enum STATUS_ACTIVE {
  Active = 'active',
  Inactive = 'inactive'
}

export interface SELECT_STATUS_ACTIVE {
  label: 'Active' | 'Inactive'
  value: 'active' | 'inactive'
}

export interface SelectDataList {
  options: Options[]
}

export interface UseSelectOutput extends UseHookOutput {
  options: Options[]
}
