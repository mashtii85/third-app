/**
 * Components - Events - Forms - Delete - Delete
 */

//Constants
import { SIZE } from '@availabletowork/constants'

//Types
import { DeleteEventProps } from '@availabletowork/types'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeleteEvent } from '../../hooks'

export const DeleteEvent = ({ eventId, title, filters, onSuccess }: DeleteEventProps) => {
  const { deleteEvent } = useDeleteEvent({
    filters: filters,
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const handleDelete = () => {
    deleteEvent({ variables: { eventId } })
  }

  return (
    <>
      <Text>Are you sure to delete event '{title}'?</Text>
      <Space />
      <Button size={SIZE.SM} content="Delete" context="danger" onClick={handleDelete} />
    </>
  )
}
