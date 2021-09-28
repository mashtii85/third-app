// Types
import { SELECT, STATUS_ACTIVE } from '../../../types/select.d'
import { AccountsRow } from '../list/table/types.d'
import { AccountFilters } from '../types.d'

export interface AccountFormProps {
  filters?: AccountFilters
  defaultValues?: AccountsRow

  onSuccess: (data: any) => void
}

export interface CreateAccountForm {
  name: string
  firstName: string
  lastName: string
  email: string
  status: STATUS_ACTIVE
  taxonomy: SELECT
}
