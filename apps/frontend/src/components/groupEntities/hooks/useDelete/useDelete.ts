/**
 * Components - GroupEntities - Hooks - UseDelete - UseDelete
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_GROUP_ENTITY_BY_PK, GET_GROUP_ENTITIES } from '../../queries/queries'

// Types
import {
  GroupEntityDeleteData,
  GroupDeleteVariables,
  UseDeleteGroupEntityOutput,
  useDeleteGroupEntityProps
} from './types'
import { GroupEntity } from '../../../../types/groupEntity'
import { prepareGroupEntitiesArguments } from '../helpers'

export const useDeleteGroupEntity = (
  props: useDeleteGroupEntityProps
): UseDeleteGroupEntityOutput => {
  const [deleteGroupEntity, { loading, error }] = useMutation<
    GroupEntityDeleteData,
    GroupDeleteVariables
  >(DELETE_GROUP_ENTITY_BY_PK, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const variables = prepareGroupEntitiesArguments({ filters: props.filters })

      const { groupEntities } = cache.readQuery<{ groupEntities: GroupEntity[] }>({
        query: GET_GROUP_ENTITIES,
        variables
      }) || { groupEntities: [] }
      const groupList = groupEntities.filter((entity) => entity.id !== data?.groupEntity.id)
      cache.writeQuery({
        query: GET_GROUP_ENTITIES,
        variables,
        data: { groupEntities: groupList }
      })
    }
  })
  return { error, loading, deleteGroupEntity }
}
