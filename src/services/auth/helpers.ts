/**
 * Auth utils
 */

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}

export const validatePassword = (user: any, password: string): boolean => {
  if (!password || !user.password) {
    return false
  }
  return bcrypt.compareSync(password, user.password)
}

export const generateToken = (data: any): string => {
  return jwt.sign(data, process.env.JWT_PRIVATE_KEY, {
    algorithm: 'RS512',
    expiresIn: '7d'
  })
}

export const validateToken = (token: string): boolean => {
  return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_PUBLIC_KEY, {
    algorithms: ['RS512']
  })
}

export const prepareUserData = (user, account, role) => {
  // Get admin
  let adminId = null
  if (account && account.admins.length) {
    adminId = account.admins[0].adminId
  } else if (account && account.type === 'admin') {
    adminId = account.id
  }

  const userData = {
    id: user.id,
    email: user.email,
    nameFirst: user.nameFirst,
    nameLast: user.nameLast,
    adminId: adminId,
    accountId: account ? account.id : null,
    accountType: account ? account.type : 'tenant',
    role: role
  }

  // Override superadmin role
  const hasuraRole = account && account.type === 'superadmin' ? 'admin' : role

  return {
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': [hasuraRole],
      'x-hasura-default-role': hasuraRole,
      'x-hasura-user-id': user.id.toString(),
      'x-hasura-admin-id': adminId ? adminId.toString() : 'null',
      'x-hasura-account-id': account ? account.id.toString() : 'null',
      'x-hasura-account-type': account ? account.type : 'tenant'
    },
    user: userData
  }
}

export const getUserFromToken = (headers) => {
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

export const getJWTData = (user) => {
  const { accountUser } = user
  let account = null
  let role = 'tenant_user'

  if (accountUser) {
    account = accountUser.account
    // Set user's role to {type}_user, unless the user has owner role
    if (accountUser.role === 'owner') {
      role = `${accountUser.account.type}_owner`
    } else {
      role = `${accountUser.account.type}_user`
    }

    // role = `${account.type}_${account.Account_User.role}`
  }

  return prepareUserData(user, account, role)
}
