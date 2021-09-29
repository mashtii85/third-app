/**
 * Components - Locations - Forms - Delete - Delete
 */

import { SIZE } from '../../../../config/theme'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { DeleteLocationProps } from './types'
import { useDeleteLocation } from '../../hooks'

export const DeleteLocation = ({
  accountId,
  locationId,
  name,
  filters,
  onSuccess
}: DeleteLocationProps) => {
  const { deleteLocation } = useDeleteLocation({
    accountId,
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
