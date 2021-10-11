// Types
import { SELECT, STATUS_ACTIVE } from '../../../types/select.d'
import { AccountsRow } from '../list/table/types.d'
import { AccountFilters } from '../types.d'

export interface AccountFormProps {
  filters?: Partial<AccountFilters> | undefined
  defaultValues?: AccountsRow | any
  isAdmin: boolean
  onSuccess: (data: any) => void
}

export interface CreateAccountForm {
  add_contact_user?: boolean
  client_id: number
  clientId: number
  custom_fields: any
  firstName: string
  email: string
  isCreateUser?: string
  lastName: string
  name: string
  status: STATUS_ACTIVE
  taxonomy: SELECT
  type: string
}
