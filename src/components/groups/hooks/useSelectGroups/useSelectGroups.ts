/**
 * Components - Groups - Hooks - UseSelectGroups - UseSelectGroups
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_GROUPS_SELECT } from '../../queries'
import { prepareGroupSelectArguments } from './helpers'

// Types
import { GroupFilter } from '../useGroups/types'
import { GroupSelectDataList, UseGroupSelectOutput } from './types'

export const useSelectGroups = (filters: Partial<GroupFilter>): UseGroupSelectOutput => {
  const variables = prepareGroupSelectArguments(filters)
  const { data, error, loading } = useQuery<GroupSelectDataList>(GET_GROUPS_SELECT, {
    variables
  })

  return { error, loading, options: data?.options || [] }
}
