/**
 * Components - Events - Forms - Delete - Delete
 */

import { SIZE } from '../../../../config/theme'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { DeleteEventProps } from './types'
import { useDeleteEvent } from '../../hooks'

export const DeleteEvent = ({
  accountId,
  eventId,
  title,
  filters,
  onSuccess
}: DeleteEventProps) => {
  const { deleteEvent } = useDeleteEvent({
    accountId,
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
