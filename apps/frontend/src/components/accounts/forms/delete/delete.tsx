/**
 * Components - Accounts - Delete - Delete
 */

// Constants
import { SIZE } from '@availabletowork/constants'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeleteAccount } from '../../hooks/useDelete/useDelete'

// Types
import { AccountFilters } from '@availabletowork/types'

export const DeleteAccountForm = ({
  id,
  accountName,
  filters,
  onSuccess
}: {
  id: number
  accountName: string
  filters?: Partial<AccountFilters>
  onSuccess: () => void
}) => {
  const { deleteAccount } = useDeleteAccount({
    filters,
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const handleDelete = () => {
    deleteAccount({ variables: { accountId: id } })
  }

  return (
    <>
      <Text>Are you sure to delete '{accountName}' account?</Text>
      <Space />
      <Button size={SIZE.SM} content="Delete" context="danger" onClick={handleDelete} />
    </>
  )
}
