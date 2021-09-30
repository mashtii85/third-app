/**
 * Components - Media - Hooks - useCreate - useCreate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_MEDIUM, GET_MEDIA } from '../../queries/queries'

// Types
import { MediaCreateData, MediaCreateType, UseCreateMediaOutput } from './types.d'
import { UseHookProps } from '../../../../types/hook.d'
import { LooseObject } from '../../../../types/object.d'
import { Medium } from '../../../../types/medium.d'

export const useCreateMedia = (
  mediaProps: Partial<MediaCreateType>,
  props: UseHookProps<MediaCreateData>
): UseCreateMediaOutput => {
  const [createMedia, { error, loading }] = useMutation<MediaCreateData, MediaCreateType>(
    CREATE_MEDIUM,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const variables: LooseObject = {
          where: { entity: { _eq: mediaProps.entity }, entity_id: { _eq: mediaProps.entityId } }
        }
        const { media } = cache.readQuery<{ media: Medium[] }>({
          query: GET_MEDIA,
          variables
        }) || { media: [] }
        cache.writeQuery({
          query: GET_MEDIA,
          variables,
          data: { media: [...media, data?.media] }
        })
      }
    }
  )
  return { error, loading, createMedia }
}
