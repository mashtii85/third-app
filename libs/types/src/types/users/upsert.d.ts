// Constants
import { USER_STATUS } from '@availabletowork/constants'

// Types
import { UserMeta, UsersFilter } from '.'
import { UserRow } from '..'

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
