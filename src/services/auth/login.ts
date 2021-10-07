/**
 * Services - Auth - Login
 */

// Utils
import { LOG, TE } from '../../utils/api/errors'

// GQL
import { query } from '../graphqlClient'
import { GET_USER_BY_EMAIL } from '../../components/users/queries'

// Helpers
import { generateToken, prepareUserData, validatePassword } from './helpers'

// Types
import { LoginModel } from './types.d'
import { STATUS_ACTIVE } from '../../types/select.d'
import { LOG_LEVEL } from '../../utils/api/types.d'
import { AccountUsers, CurrentUser, USER_STATUS } from '../../types/user.d'

export const login = async (email: string, password: string): Promise<LoginModel> => {
  if (!email || !password) {
    TE('Email or password is missing', 401)
  }

  let accountUser: Partial<AccountUsers> = {}

  const data = await query(GET_USER_BY_EMAIL, { email })

  if (!data?.user) {
    LOG(`Login attempt with non-existing email address: ${email}`, LOG_LEVEL.Info)
    TE('Email or password is incorrect', 401)
  }

  const user: CurrentUser = data.user[0]

  // Throw an error if user is not active or doesn't belong to an account
  if (
    user?.status === USER_STATUS.Inactive ||
    user?.status === USER_STATUS.Banned ||
    !user?.accounts?.length
  ) {
    TE('Not active', 401)
  }

  // Login into the first active account
  user?.accounts?.forEach((a: AccountUsers) => {
    if (a.status !== USER_STATUS.Inactive && a.account.status !== STATUS_ACTIVE.Inactive) {
      accountUser = a
    }
  })

  // Validate password
  if (!validatePassword(user?.password || '', password)) {
    TE('Invalid password', 401)
  }

  // Get JWT data
  const userData = prepareUserData(user, accountUser)
  const token = generateToken(userData)

  if (!token) {
    TE('Error generating token')
  }

  return { token, user: userData.user }
}
