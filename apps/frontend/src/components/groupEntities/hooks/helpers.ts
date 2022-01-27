/**
 * Components - GroupEntities - Hooks - Helpers
 */

//Constants
import { STATUS_ACTIVE } from '@availabletowork/types'

// Types
import {
  GQLClause,
  GraphqlWhere,
  GroupEntity,
  PrepareGroupEntitiesArgumentProps
} from '@availabletowork/types'

export const prepareGroupEntitiesArguments = ({
  filters
}: PrepareGroupEntitiesArgumentProps): GQLClause<GroupEntity> => {
  const condition: GraphqlWhere<GroupEntity> = { status: { _eq: STATUS_ACTIVE.Active } }

  if (filters?.entity) {
    condition.entity = { _eq: filters.entity }
  }

  if (filters?.q) {
    condition.group = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      name: { _ilike: filters.q }
    }
  }

  if (filters?.status) {
    condition.status = { _eq: filters.status }
  }

  if (filters?.entityId) {
    condition.entity_id = { _eq: filters.entityId }
  }

  const otherClause = {
    limit: filters?.limit ?? null,
    offset: filters?.offset ?? null,
    order_by: filters?.orderBy ?? {}
  }

  return { ...otherClause, where: condition }
}
