/**
 * Components - Accounts - Delete - Delete
 */

import { SIZE } from '../../../../config/theme'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { AccountFilters } from '../../types'
import { useDeleteAccount } from '../../hooks/useDelete/useDelete'

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
      <Text>Are you sure to delete `${accountName}` account?</Text>
      <Space />
      <Button size={SIZE.SM} content="Delete" context="danger" onClick={handleDelete} />
    </>
  )
}
