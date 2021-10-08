/**
 * Components - Medias - Hooks - useDelete - useDelete
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_MEDIUM_BY_PK, GET_MEDIA } from '../../queries/queries'

// Types
import { MediaDeleteData, MediaDeleteVariables, UseDeleteMediaOutput } from './types.d'
import { UseHookProps } from '../../../../types/hook.d'
import { Medium } from '../../../../types/medium.d'
import { MediaDeleteProps } from '../useDelete/types.d'

// Helpers
import { prepareArguments } from '../useMedia/helpers'

export const useDeleteMedia = (
  filters: MediaDeleteProps,
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
