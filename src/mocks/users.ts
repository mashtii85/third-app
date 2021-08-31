/**
 * Mocks - Users
 *
 */

// Types
import { User } from '../types/user.d'

export const Users: User[] = [
  {
    id: 1,
    account_type: 'admin',
    email: 'admin@realworldacademies.com',
    name_first: 'DRYKISS Admin',
    name_last: 'RWA',
    phone: '+443 222 444',
    status: 'active',
    created_at: '2 Sep 2000',
    updated_at: '12 Aug 2021'
  },
  {
    id: 2,
    account_type: 'user',
    email: 'demo@realworldacademies.com',
    name_first: 'DRYKISS User',
    name_last: 'RWA',
    phone: '+413 322 444',
    status: 'banned',
    created_at: '2 Sep 2000',
    updated_at: '12 Aug 2021'
  },
  {
    id: 3,
    account_type: 'user',
    email: 'hossein@realworldacademies.com',
    name_first: 'Hossein',
    name_last: 'ojaghi',
    phone: '+423 242 424',
    status: 'inactive',
    created_at: '2 Sep 2000',
    updated_at: '12 Aug 2021'
  }
]
