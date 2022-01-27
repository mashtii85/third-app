/**
 * Components - Utils - nullFreeObject
 */

import { LooseObject } from '@availabletowork/types'

export const nullFreeObject = (entries?: LooseObject): LooseObject => {
  if (!entries) return {}
  Object.entries(entries).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      delete entries[key]
    }
  })
  return entries
}
