/**
 * Components - Groups - Hooks - UseSelectGroups - Helpers
 */

//Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { GQLClause, GraphqlWhere, Group, GroupFilter } from '@availabletowork/types'

export const prepareGroupSelectArguments = (filters: Partial<GroupFilter>): GQLClause<Group> => {
  const condition: GraphqlWhere<Group> = { status: { _eq: STATUS_ACTIVE.Active } }

  if (filters?.entity) {
    condition._not = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      group_entities: {
        entity: { _eq: filters.entity }
      }
    }
  }

  return { where: condition }
}
