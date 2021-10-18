/**
 * Components - Accounts - Lists - UserAccounts - Table
 */

// Types
import { Column } from '../../../../../types/column'
import { User } from '../../../../../types/user'
import { UserAccount } from '../../accounts/table/types'

import { capitalize, formatDateStandard } from '@drykiss/industry-ui'

export const columns: Column<User>[] = [
  {
    text: 'First Name'
  },
  {
    text: 'Last Name'
  },
  {
    text: 'Email'
  },
  {
    text: 'Created'
  },
  {
    text: 'Status'
  }
]

export const rows = (users: User[]) => {
  return users?.map((user: UserAccount) => {
    return {
      firstName: user.name_first,
      lastName: user.name_last,
      email: user.email,
      created: formatDateStandard(user.created_at),
      status: capitalize(user.status)
    }
  })
}
