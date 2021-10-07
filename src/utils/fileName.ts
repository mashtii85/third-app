/**
 * Filename
 * Creates a unique filename using UUID4 random string
 */

import { v4 as uuidv4 } from 'uuid'

export const fileName = (originalname: string): string => {
  const uuid = uuidv4()

  const index = originalname.lastIndexOf('.')
  const extension = originalname.substr(index + 1)

  return `${uuid}.${extension}`
}
