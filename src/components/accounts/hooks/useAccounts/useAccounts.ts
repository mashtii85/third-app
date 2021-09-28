/**
 * Components - Accounts- Hooks - UseAccounts -  UseAccounts
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ACCOUNTS } from '../../queries/queries'
// Types
import { AccountData, UseAccountsOutput, UseAccountsVariable } from '../types'
import { prepareUseAccounts } from './helpers'

export const useAccounts = ({ filters }: UseAccountsVariable): UseAccountsOutput => {
  const variables = prepareUseAccounts(filters)
  const { data, error, loading } = useQuery<AccountData, any>(GET_ACCOUNTS, {
    variables
  })

  if (error) {
    return { loading: false, error }
  }

  return { loading, accounts: data?.accounts || [] }
}
