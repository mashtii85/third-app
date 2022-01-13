/**
 * Components - GroupEntities - Hooks - UseGroupEntities - UseGroupEntities
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_GROUP_ENTITIES } from '../../queries/queries'
import { prepareGroupEntitiesArguments } from '../helpers'

// Types
import { GroupEntityDataList, GroupEntityFilter, UseGroupEntityOutput } from './types'

export const useGroupEntities = (filters: Partial<GroupEntityFilter>): UseGroupEntityOutput => {
  const variables = prepareGroupEntitiesArguments({ filters })

  const { data, error, loading } = useQuery<GroupEntityDataList>(GET_GROUP_ENTITIES, {
    variables
  })

  return { error, loading, groupEntities: data?.groupEntities || [] }
}
