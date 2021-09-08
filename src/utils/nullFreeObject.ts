/**
 * Components - Utils - nullFreeObject
 */

import { LooseObject } from '../types/object'

export const nullFreeObject = (entries?: LooseObject) => {
  if (!entries) return {}
  Object.entries(entries).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      delete entries[key]
    }
  })
  return entries
}
