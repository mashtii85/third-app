import { Account } from '../../../../types/account'

export interface TableProps {
  title?: string
  type?: string
  accountId?: number
}

export interface UserAccount {
  account?: Account | any
  [key: string]: any
}
