/**
 * Utils - Use Current Account
 */

// Hooks
import { useAccount } from '../components/accounts/hooks/useAccount/useAccount'
import { useCurrentUser } from './useCurrentUser'

// Types
import { Account } from '@availabletowork/types'

export const useCurrentAccount = (): Account | undefined => {
  const { user } = useCurrentUser()
  const { account } = useAccount({ accountId: user?.account_id })
  return account
}
