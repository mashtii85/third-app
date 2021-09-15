/**
 * Mocks - Users
 *
 */

// Types
import { ACCOUNT_TYPE } from '../types/account.d'
import { User, USER_STATUS } from '../types/user.d'

export const Users: User[] = [
  {
    id: 1,
    client_id: 1,
    account_id: 1,
    account_type: ACCOUNT_TYPE.Admin,
    email: 'admin@example.com',
    name_first: 'Admin',
    name_last: 'RWA',
    custom_fields: {
      phone: '+443 222 444'
    },
    status: USER_STATUS.Active,
    created_at: '2021-09-02T08:00:08.064531+00:00',
    updated_at: '2021-09-02T08:04:46.281908+00:00'
  },
  {
    id: 2,
    client_id: 2,
    account_id: 2,
    account_type: ACCOUNT_TYPE.Client,
    email: 'uaefa@example.com',
    name_first: 'UAE FA',
    name_last: 'Manager',
    custom_fields: {
      phone: '+443 222 444'
    },
    status: USER_STATUS.Active,
    created_at: '2021-09-02T08:03:57.706908+00:00',
    updated_at: '2021-09-02T08:03:57.706908+00:00'
  },
  {
    id: 3,
    client_id: 3,
    account_id: 3,
    account_type: ACCOUNT_TYPE.Client,
    email: 'drykiss@example.com',
    name_first: 'DryKISS',
    name_last: 'Manager',
    custom_fields: {
      phone: '+443 333 555'
    },
    status: USER_STATUS.Inactive,
    created_at: '2021-09-02T09:50:11.486923+00:00',
    updated_at: '2021-09-02T09:50:11.486923+00:00'
  },
  {
    id: 4,
    client_id: 2,
    account_id: 4,
    account_type: ACCOUNT_TYPE.Account,
    email: 'demo@example.com',
    name_first: 'Demo',
    name_last: 'User',
    custom_fields: {
      phone: '+443 666 777'
    },
    status: USER_STATUS.Active,
    created_at: '2021-09-02T10:11:40.056412+00:00',
    updated_at: '2021-09-02T10:11:40.056412+00:00'
  }
]
