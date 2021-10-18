import { UseHookOutput } from '../../../../types/hook'
import { User } from '../../../../types/user'

export interface UseUsersOutput extends UseHookOutput {
  users: User[]
}

export interface UserData {
  users?: User[]
}
