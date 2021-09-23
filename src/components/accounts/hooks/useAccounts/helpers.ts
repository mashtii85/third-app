/**
 * Components - Accounts- Hooks - UseAccounts -  Helpers
 */

// Types
import { LooseObject } from '../../../../types/object.d'
import { AccountFilters } from '../../types.d'

export const prepareUseAccounts = (filters?: AccountFilters): LooseObject => {
  if (!filters) {
    return {}
  }
  const variables: LooseObject = {}

  const where: LooseObject = {}

  if (filters?.accountId) {
    where.client_id = { _eq: filters.accountId }
  }

  if (filters?.type) {
    where.type = { _eq: filters.type }
  }

  variables.limit = filters?.limit
  variables.offset = filters?.offset
  variables.order = filters?.orderBy

  variables.where = where
  return variables
}
