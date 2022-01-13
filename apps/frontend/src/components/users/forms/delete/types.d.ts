/**
 * Components - Users - Forms - Delete - Types.d
 */

import { UsersFilter } from '../../../accounts/types'

export interface DeleteUserFormProps {
  id: number
  filters: UsersFilter
  userName: string
  onSuccess: () => void
}
