/**
 * Components - Users - Types
 */

// Types
import { User } from '../../types/user'

export interface UserFormProps {
  defaultValues: User | any
  submit: (form: User) => void
}

export interface UserDetailsProps {
  userId: number
}
