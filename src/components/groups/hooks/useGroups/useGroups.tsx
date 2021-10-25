/**
 * Components - Groups - Hooks - useGroup
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_GROUPS } from '../../queries/queries'

// Types
import { GroupDataList, GroupFilter } from './types'

// Utils
import { generateWhereClause } from '../../../../utils/whereClause'

export const useGroups = (filters: Partial<GroupFilter>) => {
  const where = generateWhereClause(filters)
  const { data, error, loading, refetch } = useQuery<GroupDataList>(GET_GROUPS, {
    variables: { where }
  })

  return { error, loading, groups: data?.groups || [], refetch }
}
