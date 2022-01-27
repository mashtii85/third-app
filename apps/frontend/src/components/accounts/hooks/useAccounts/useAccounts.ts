/**
 * Components - Accounts- Hooks - UseAccounts -  UseAccounts
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ACCOUNTS } from '../../queries/queries'

// Types
import { AccountData, UseAccountsOutput, UseAccountsVariable } from '@availabletowork/types'

import { prepareUseAccounts } from '../helpers'

export const useAccounts = ({ filters }: UseAccountsVariable): UseAccountsOutput => {
  const variables = prepareUseAccounts(filters)
  const { data, error, loading } = useQuery<Partial<AccountData>>(GET_ACCOUNTS, {
    variables
  })

  return { error, loading, accounts: data?.accounts || [] }
}
