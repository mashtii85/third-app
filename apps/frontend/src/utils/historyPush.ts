/**
 * Utils - History Push
 *
 */

import { LooseObject } from '../types/object'

export const historyPush = (params: LooseObject): void => {
  const url = new URL(window?.location as any)

  Object.keys(params).forEach((key) => {
    if (params[key]) {
      url.searchParams.set(key, params[key])
    } else {
      url.searchParams.delete(key)
    }
  })

  window.history.pushState({}, '', url)
}
