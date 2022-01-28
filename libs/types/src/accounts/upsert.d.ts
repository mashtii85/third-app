// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { AccountFilters } from '.'
import { Options } from '..'
import { AccountsRow } from './table'

export interface AccountFormProps {
  filters?: Partial<AccountFilters>
  defaultValues?: AccountsRow
  onSuccess: (data: any) => void
}

export interface CreateAccountForm {
  name: string
  firstName: string
  lastName: string
  password: string
  phone: string
  email: string
  status: STATUS_ACTIVE
  taxonomy?: Options
  custom_fields: any
  add_contact_user?: boolean
  isCreateUser?: string
  type: string
  meta: any
  clientModules: string[]
}

export interface ClientModuleProps {
  locations: boolean
  events: boolean
  learning: boolean
}
