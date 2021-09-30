/**
 * Components - Media - Hooks - useMedia
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_MEDIA } from '../../queries/queries'
import { MediaData, MediaSearchVariables, UseMediaProps } from './types'
import { prepareArguments } from './helpers'

export const useMedia = (filters: UseMediaProps) => {
  const where = prepareArguments({ filters })
  const { data, error, loading } = useQuery<MediaData, MediaSearchVariables>(GET_MEDIA, {
    variables: {
      where
    }
  })

  if (error) {
    return { loading: false, error, mediaList: [] }
  }

  return { loading, mediaList: data?.media || [] }
}
