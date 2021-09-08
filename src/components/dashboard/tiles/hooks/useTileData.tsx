/**
 * Components - Dashboard - Tiles - Hooks - useCourseAggregate
 */

// Apollo
import { useQuery } from '@apollo/client'
import { TileData, CourseAggregateVariables, UseTileDataOutput, UseTileDataProps } from './types.d'

export const useAggregate = ({
  accountId,
  query,
  prepareTiles
}: UseTileDataProps): UseTileDataOutput => {
  const { data, error, loading } = useQuery<TileData, CourseAggregateVariables>(query, {
    variables: {
      accountId
    }
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
