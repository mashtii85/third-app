/**
 * Components - Medias - Hooks - useDelete - useDeleteById
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_MEDIUM_BY_PK, GET_MEDIA } from '@availabletowork/queries'

// Types
import {
  MediaDeleteProps,
  MediaDeleteData,
  MediaDeleteVariables,
  Medium,
  UseDeleteMediaOutput,
  UseHookProps
} from '@availabletowork/types'

// Helpers
import { prepareArguments } from '../useMedia/helpers'

export const useDeleteMediumById = (
  filters: Partial<MediaDeleteProps>,
  props: UseHookProps<MediaDeleteData>
): UseDeleteMediaOutput => {
  const [deleteMedia, { loading, error }] = useMutation<MediaDeleteData, MediaDeleteVariables>(
    DELETE_MEDIUM_BY_PK,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const where = prepareArguments({ filters })
        const { media } = cache.readQuery<{ media: Medium[] }>({
          query: GET_MEDIA,
          variables: { where, order_by: { id: 'desc' } }
        }) || { media: [] }
        const mediaList = media.filter((adr) => adr.id !== data?.media.id)
        cache.writeQuery({
          query: GET_MEDIA,
          variables: { where, order_by: { id: 'desc' } },
          data: { media: mediaList }
        })
      }
    }
  )
  return { error, loading, deleteMedia }
}
