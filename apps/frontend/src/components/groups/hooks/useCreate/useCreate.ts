/**
 * Components - Groups - Hooks - useCreate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_GROUPS, GET_GROUPS } from '../../queries/queries'

// Types
import {
  Group,
  GroupCreateData,
  GroupFormType,
  UseCreateGroupOutput,
  UseHookProps
} from '@availabletowork/types'

export const useCreateGroup = (
  accountId: number,
  props: UseHookProps<GroupCreateData>
): UseCreateGroupOutput => {
  const [createGroup, { error, loading }] = useMutation<GroupCreateData, GroupFormType>(
    CREATE_GROUPS,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const variables = {
          where: { account_id: { _eq: accountId } }
        }
        const { groups } = cache.readQuery<{ groups: Group[] }>({
          query: GET_GROUPS,
          variables
        }) || { groups: [] }
        cache.writeQuery({
          query: GET_GROUPS,
          variables,
          data: { groups: [...groups, ...(data?.groups?.returning as Group[])] }
        })
      }
    }
  )
  return { error, loading, createGroup }
}
