/**
 * Services - Auth - Switch Account
 */

// Utils
import { TE } from '@drykiss/nest-utils'

// Types
import { LoginModel } from './types'

export const switchAccount = async (accountId: number, headers: any): Promise<LoginModel> => {
  if (!accountId || !headers) {
    TE('Account ID or token is missing', 401)
  }

  const userData = {
    user: {}
  }

  const token = 'test' // ToDo: generate new token

  if (!token) {
    TE('Error generating token')
  }

  return { token, user: userData.user }
}
