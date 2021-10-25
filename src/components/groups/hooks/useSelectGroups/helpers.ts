/**
 * Components - Groups - Hooks - UseSelectGroups - Helpers
 */

// Types
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { GQLClause, GraphqlWhere } from '../../../../types/gql'
import { Group } from '../../../../types/group'
import { GroupFilter } from '../useGroups/types'

export const prepareGroupSelectArguments = (filters: Partial<GroupFilter>): GQLClause<Group> => {
  const condition: GraphqlWhere<Group> = { status: { _eq: STATUS_ACTIVE.Active } }

  if (filters?.entity) {
    // @ts-ignore
    condition._not = {
      group_entities: {
        entity: { _eq: filters.entity }
      }
    }
  }

  return { where: condition }
}
