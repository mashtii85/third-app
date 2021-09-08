/**
 * Components - Utils - Is Json
 */

export const isJson = (str: string) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const IsJsonString = (str: string) => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return false
  }
}
