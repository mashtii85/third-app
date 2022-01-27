/**
 * Auth utils
 */

// Libs
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Types
import { ACCOUNT_TYPE, AccountUsers, CurrentUser, LoginDataModel } from '@availabletowork/types'

export const hashPassword = (password?: string): string | undefined => {
  if (password) {
    return bcrypt.hashSync(password, 10)
  } else {
    return undefined
  }
}

export const validatePassword = (userPassword: string, formPassword: string): boolean => {
  if (!formPassword || !userPassword) {
    return false
  }
  return bcrypt.compareSync(formPassword, userPassword)
}

export const generateToken = (data: LoginDataModel): string => {
  return jwt.sign(data, process.env.JWT_PRIVATE_KEY, {
    algorithm: 'RS512',
    expiresIn: '7d'
  })
}

export const validateToken = (token: string): Partial<LoginDataModel> => {
  return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_PUBLIC_KEY, {
    algorithms: ['RS512']
  })
}

export const prepareUserData = (
  user: CurrentUser,
  accountUser: Partial<AccountUsers>
): LoginDataModel => {
  const userData: CurrentUser = {
    id: user.id,
    email: user.email,
    name_first: user.name_first,
    name_last: user.name_last,
    custom_fields: user.custom_fields,
    phone: user.phone,
    email_verified: user.email_verified,
    status: user.status,
    account_id: accountUser.account_id || 0,
    account_type: accountUser?.account?.type || ACCOUNT_TYPE.Member,
    client_id: accountUser?.account?.client_id || 0
  }

  // Add Account ID as Client ID as fallback for admins and clients
  if (userData.account_type !== ACCOUNT_TYPE.Member) {
    userData.client_id = userData.account_id
  }

  return {
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': [userData.account_type],
      'x-hasura-default-role': userData.account_type,
      'x-hasura-user-id': user.id.toString(),
      'x-hasura-client-id': userData?.client_id?.toString() || 'null',
      'x-hasura-account-id': userData?.account_id?.toString() || 'null',
      'x-hasura-account-type': userData.account_type || 'null'
    },
    user: userData
  }
}

export const getUserFromToken = (headers: any): Partial<CurrentUser> | null => {
  if (!headers.Authorization) {
    return null
  }

  const token = headers.Authorization.split(' ')[1]

  if (!token) {
    return null
  }

  const decoded = validateToken(token)

  if (!decoded || !decoded.user) {
    return null
  }

  return decoded.user
}
