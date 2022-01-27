/**
 * Components - Groups - Forms - Delete
 */

import { SIZE } from '@availabletowork/types'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeleteGroup } from '../../hooks/useDelete/useDelete'

// Types
import { GroupDeleteType } from '@availabletowork/types'

export const GroupDeleteForm = ({
  groupDeleteProps,
  onSuccess
}: {
  groupDeleteProps: GroupDeleteType
  onSuccess: () => void
}) => {
  const { deleteGroup } = useDeleteGroup(groupDeleteProps, {
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const handleDelete = () => {
    deleteGroup({ variables: { id: groupDeleteProps.id } })
  }

  return (
    <>
      <Text>Are you sure to delete group '{groupDeleteProps.name}'?</Text>
      <Space />
      <Button size={SIZE.SM} content="Delete" context="danger" onClick={handleDelete} />
    </>
  )
}
