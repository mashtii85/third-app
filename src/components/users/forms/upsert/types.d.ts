/**
 * Components - Users - Forms - Upsert - Types.d
 */

// Types
import { LooseObject } from '../../../../types/object'
import { UserCustomFields, USER_STATUS } from '../../../../types/user'
import { UserRow } from '../../../accounts/lists/accountUsers/table/types'
import { UsersFilter } from '../../../accounts/types'

export type UserForm = {
  name_first: string
  name_last: string
  status: USER_STATUS
  email: string
  custom_fields: UserCustomFields | undefined
  password: string | undefined
}

export interface UserFormProps {
  defaultValues?: UserRow | LooseObject
  filters?: UsersFilter
  onSuccess: () => void
}
