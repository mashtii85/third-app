/**
 * Components - Groups - Hooks - UseSelectGroups - UseSelectGroups
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_GROUPS_SELECT } from '../../queries'
import { prepareGroupSelectArguments } from './helpers'

// Types
import { GroupFilter, SelectDataList, UseSelectOutput } from '@availabletowork/types'

export const useSelectGroups = (filters: Partial<GroupFilter>): UseSelectOutput => {
  const variables = prepareGroupSelectArguments(filters)
  const { data, error, loading } = useQuery<SelectDataList>(GET_GROUPS_SELECT, {
    variables
  })

  return { error, loading, options: data?.options || [] }
}
