/**
 * Components - Locations - Forms - Delete - Delete
 */

// Constants
import { SIZE } from '@availabletowork/types'

// Types
import { DeleteLocationProps } from '@availabletowork/types'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeleteLocation } from '../../hooks'

export const DeleteLocation = ({ locationId, name, filters, onSuccess }: DeleteLocationProps) => {
  const { deleteLocation } = useDeleteLocation({
    filters: filters,
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const handleDelete = () => {
    deleteLocation({ variables: { locationId } })
  }

  return (
    <>
      <Text>Are you sure to delete location '{name}'?</Text>
      <Space />
      <Button size={SIZE.SM} content="Delete" context="danger" onClick={handleDelete} />
    </>
  )
}
