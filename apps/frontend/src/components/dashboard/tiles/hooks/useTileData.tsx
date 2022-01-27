/**
 * Components - Dashboard - Tiles - Hooks - useCourseAggregate
 */

// Apollo
import { useQuery } from '@apollo/client'

import {
  ClientTileData,
  CourseAggregateVariables,
  UseTileDataOutput,
  UseTileDataProps
} from '@availabletowork/types'

import { prepareTileData } from './helpers'

export const useAggregate = ({
  clientId,
  query,
  prepareTiles
}: UseTileDataProps): UseTileDataOutput => {
  const variables = prepareTileData({ clientId })

  const { data, error, loading } = useQuery<ClientTileData, CourseAggregateVariables>(query, {
    variables
  })

  if (data) {
    return { items: prepareTiles(data), loading: false }
  }

  return {
    items: [],
    error,
    loading
  }
}
