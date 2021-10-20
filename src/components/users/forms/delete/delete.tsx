/**
 * Components - Users - Forms - Delete - DeleteUser
 */

import { SIZE } from '../../../../config/theme'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeleteUser } from '../../../users/hooks'
import { DeleteUserFormProps } from './types'

export const DeleteUserForm = ({ id, userName, filters, onSuccess }: DeleteUserFormProps) => {
  const { deleteUser } = useDeleteUser({
    filters,
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const handleDelete = () => {
    deleteUser({ variables: { userId: id } })
  }

  return (
    <>
      <Text>Are you sure to remove user '{userName}' from this account?</Text>
      <Space />
      <Button size={SIZE.SM} content="Delete" context="danger" onClick={handleDelete} />
    </>
  )
}
