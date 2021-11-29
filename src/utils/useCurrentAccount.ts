/**
 * Utils - Use Current Account
 */

// Hooks
import { useAccount } from '../components/accounts/hooks/useAccount/useAccount'

// Types
import { useCurrentUser } from './useCurrentUser'
import { Account } from '../types/account.d'

export const useCurrentAccount = (): Account | undefined => {
  const { user } = useCurrentUser()
  const { account } = useAccount({ accountId: user?.account_id })
  return account
}
