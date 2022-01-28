//Types
import { User } from '.'
import { UseHookOutput } from '../general'

export interface UseUsersOutput extends UseHookOutput {
  users: User[]
}

export interface UserData {
  users?: User[]
}
