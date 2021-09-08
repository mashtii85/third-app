import { User } from '../../types/user'

export interface UserFormProps {
  defaultValues: User | any
  submit: (form: User) => void
}
