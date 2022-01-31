/**
 * Components - Media - Hooks - useMedia
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_MEDIA } from '@availabletowork/queries'

// Types
import { MediaDataList, MediaSearchVariables, UseMediaProps } from '@availabletowork/types'

// Helpers
import { prepareArguments } from './helpers'

export const useMedia = (filters: UseMediaProps) => {
  const where = prepareArguments({ filters })
  const { data, error, loading, refetch } = useQuery<MediaDataList, MediaSearchVariables>(
    GET_MEDIA,
    {
      variables: { where, order_by: { id: 'desc' } }
    }
  )

  if (error) {
    return { loading: false, error, mediaList: [], refetch }
  }

  return { loading, mediaList: data?.media || [], refetch }
}
