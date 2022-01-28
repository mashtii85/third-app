/**
 * Components - Media - Forms - Delete
 */

// Constants
import { SIZE } from '@availabletowork/constants'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeleteMediumById } from '../../hooks/useDelete/useDeleteById'

// Types
import { MediaDeleteProps } from '@availabletowork/types'

export const MediaDeleteForm = ({
  id,
  entity,
  entityId,
  caption,
  onSuccess
}: {
  id: number
  entity?: string
  entityId?: number
  caption?: string
  onSuccess: () => void
}) => {
  const mediaDeleteProps: Partial<MediaDeleteProps> = {
    id,
    entity,
    entityId,
    caption
  }
  const { deleteMedia } = useDeleteMediumById(mediaDeleteProps, {
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const handleDelete = () => {
    deleteMedia({ variables: { id: mediaDeleteProps.id } })
  }

  return (
    <>
      <Text>Are you sure to delete Media '{mediaDeleteProps.caption}'?</Text>
      <Space />
      <Button size={SIZE.SM} content="Delete" context="danger" onClick={handleDelete} />
    </>
  )
}
