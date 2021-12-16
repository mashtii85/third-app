/**
 * Components - Users - Forms - Upsert - Types.d
 */

// Types
import { UserMeta, USER_STATUS } from '../../../../types/user'
import { UserRow } from '../../../accounts/lists/accountUsers/table/types'
import { UsersFilter } from '../../../accounts/types'

export type UserForm = {
  name_first: string
  name_last: string
  status: USER_STATUS
  meta: UserMeta | undefined
  email: string
  phone: string | undefined
  password: string | undefined
}

export interface UserFormProps {
  defaultValues?: Partial<UserRow>
  filters?: UsersFilter
  onSuccess: () => void
}
