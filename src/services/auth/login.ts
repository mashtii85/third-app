/**
 * Services - Auth - Login
 */

// Libs
import jwt from 'jsonwebtoken'

// Utils
import { LOG, TE } from '../../utils/api/errors'

// GQL
import { query } from '../graphqlClient'
import { GET_USER_BY_EMAIL } from '../../components/users/queries'

// Types
import { CurrentUser } from '../../types/user'
import { LOG_LEVEL } from '../../utils/api/types.d'

interface loginModel {
  token: string
  user: CurrentUser
}

export const login = async (email: string, password: string): Promise<loginModel> => {
  if (!email || !password) {
    TE('Email or password is missing')
  }

  let user = null

  const data = await query(GET_USER_BY_EMAIL, { email })

  if (data?.user) {
    user = data.user[0]
  }

  if (!user) {
    LOG(`Login attempt with non-existing email address: ${email}`, LOG_LEVEL.Info)
    TE('Email or password is incorrect')
  }

  if (user.status === 'inactive') {
    TE('Account not active')
  }

  const token = jwt.sign({ user }, process.env.JWT_PRIVATE_KEY, {
    algorithm: 'RS512',
    expiresIn: '7d'
  })

  return {
    token,
    user
  }
}
