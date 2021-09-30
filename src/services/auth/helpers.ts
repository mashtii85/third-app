/**
 * Auth utils
 */

import bcrypt from 'bcryptjs'

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}
