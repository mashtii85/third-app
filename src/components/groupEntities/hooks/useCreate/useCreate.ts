/**
 * Components - GroupEntities - Hooks - UseCreate - UseCreate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_GROUP_ENTITY, GET_GROUP_ENTITIES } from '../../queries/queries'

// Types
import {
  GroupEntityCreateData,
  GroupEntityVariables,
  UseCreateGroupEntityOutput,
  UseCreateGroupEntityProps
} from './types'
import { GroupEntity } from '../../../../types/groupEntity'
import { prepareGroupEntitiesArguments } from '../helpers'

export const useCreateGroupEntity = (
  props: UseCreateGroupEntityProps
): UseCreateGroupEntityOutput => {
  const [createGroupEntity, { error, loading }] = useMutation<
    GroupEntityCreateData,
    GroupEntityVariables
  >(CREATE_GROUP_ENTITY, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const variables = prepareGroupEntitiesArguments({ filters: props.filters })

      const groupEntityFromResponse: Partial<GroupEntity> = data?.groupEntities?.returning[0] ?? {}

      const groupEntities =
        cache.readQuery<{ groupEntities: GroupEntity[] }>({
          query: GET_GROUP_ENTITIES,
          variables
        })?.groupEntities || []

      cache.writeQuery({
        query: GET_GROUP_ENTITIES,
        variables,
        data: {
          groupEntities: [...groupEntities, groupEntityFromResponse]
        }
      })
    }
  })
  return { error, loading, createGroupEntity }
}
