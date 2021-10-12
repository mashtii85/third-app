// Types
import { Account } from '../../../../types/account'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { Options } from '../../../../types/taxonomy'
import { AccountsRow } from '../../list/table/types'
import { AccountFilters } from '../../types'

export interface AccountFormProps {
  filters?: Partial<AccountFilters>
  defaultValues?: AccountsRow
  onSuccess: (data: any) => void
}

export interface CreateAccountForm {
  name: string
  firstName: string
  lastName: string
  email: string
  status: STATUS_ACTIVE
  taxonomy: Options
  custom_fields: any
  add_contact_user?: boolean
  isCreateUser?: string
  type: string
}
