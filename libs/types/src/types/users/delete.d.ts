import { UsersFilter } from '.'

export interface DeleteUserFormProps {
  id: number
  filters: UsersFilter
  userName: string
  onSuccess: () => void
}
