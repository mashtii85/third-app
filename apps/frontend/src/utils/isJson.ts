/**
 * Components - Utils - Is Json
 */

export const isJson = (str: string): boolean => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const IsJsonString = (str: string): any => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return false
  }
}
