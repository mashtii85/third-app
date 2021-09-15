import { Account } from '../../../types/account'
export interface AccountFormProps {
  defaultValues: Account | any
  onSuccess: (data: any) => void
}
