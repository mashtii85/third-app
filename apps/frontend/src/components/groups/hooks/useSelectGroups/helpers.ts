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
