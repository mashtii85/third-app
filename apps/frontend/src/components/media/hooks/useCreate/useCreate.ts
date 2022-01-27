/**
 * Components - Media - Hooks - useCreate - useCreate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_MEDIUM, GET_MEDIA } from '../../queries/queries'

// Types
import {
  MediaCreateData,
  MediaCreateType,
  MediaFilter,
  Medium,
  UseCreateMediaOutput,
  UseHookProps
} from '@availabletowork/types'

// Helpers
import { prepareArguments } from '../useMedia/helpers'

export const useCreateMedia = (
  filters: Partial<MediaFilter>,
  props: UseHookProps<MediaCreateData>
): UseCreateMediaOutput => {
  const [createMedia, { error, loading }] = useMutation<MediaCreateData, MediaCreateType>(
    CREATE_MEDIUM,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const where = prepareArguments({ filters })
        const { media } = cache.readQuery<{ media: Medium[] }>({
          query: GET_MEDIA,
          variables: { where, order_by: { id: 'desc' } }
        }) || { media: [] }
        cache.writeQuery({
          query: GET_MEDIA,
          variables: { where, order_by: { id: 'desc' } },
          data: { media: [...media, ...(data?.media?.returning as Medium[])] }
        })
      }
    }
  )
  return { error, loading, createMedia }
}
