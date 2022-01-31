/**
 * Components - Groups - Hooks - useDelete - useDelete
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_GROUP_BY_PK, GET_GROUPS } from '@availabletowork/queries'

// Types
import {
  Group,
  GroupDeleteData,
  GroupDeleteVariables,
  GraphqlWhere,
  UseDeleteGroupOutput,
  GroupDeleteType,
  UseHookProps
} from '@availabletowork/types'

export const useDeleteGroup = (
  groupProps: GroupDeleteType,
  props: UseHookProps<GroupDeleteData>
): UseDeleteGroupOutput => {
  const [deleteGroup, { loading, error }] = useMutation<GroupDeleteData, GroupDeleteVariables>(
    DELETE_GROUP_BY_PK,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const where: GraphqlWhere<Group> = { account_id: { _eq: groupProps.accountId } }
        const { groups } = cache.readQuery<{ groups: Group[] }>({
          query: GET_GROUPS,
          variables: { where }
        }) || { groups: [] }
        const groupList = groups.filter((group) => group.id !== data?.group.id)
        cache.writeQuery({
          query: GET_GROUPS,
          variables: { where },
          data: { groups: groupList }
        })
      }
    }
  )
  return { error, loading, deleteGroup }
}
