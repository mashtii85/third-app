import { Account } from '../../../types/account'
import { Options } from '../../../types/taxonomy'
export interface AccountFormProps {
  defaultValues: Account | any
  onSuccess: (data: any) => void
}

export interface SubmissionFormProps extends Account {
  taxonomy: Options
}
