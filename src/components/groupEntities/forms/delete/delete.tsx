/**
 * Components - GroupEntities - Forms - Delete - Delete
 */

import { SIZE } from '../../../../config/theme'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeleteGroupEntity } from '../../hooks'

// Types
import { GroupEntityDeleteType } from '../../hooks/useDelete/types'

export const GroupEntityDeleteForm = (props: GroupEntityDeleteType) => {
  const { deleteGroupEntity } = useDeleteGroupEntity({
    filters: props.filters,
    onCompleted: props.onSuccess,
    onError: (error) => {
      console.log(error.message)
    }
  })

  const handleDelete = () => {
    deleteGroupEntity({ variables: { id: props.id } })
  }

  return (
    <>
      <Text>Are you sure to remove this account from '{props.groupName}' group?</Text>
      <Space />
      <Button size={SIZE.SM} content="Remove" context="danger" onClick={handleDelete} />
    </>
  )
}
