/**
 * Components - Courses - Resources - Forms - Delete
 */

import { SIZE } from '../../../../../config/theme'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeletePost } from '../../../../posts/hooks/useDelete/useDelete'

// Types
import { PostDeleteType } from '../../../../posts/hooks/useDelete/types'

export const ResourcesDeleteForm = ({
  resourcesDeleteProps,
  onSuccess
}: {
  resourcesDeleteProps: PostDeleteType
  onSuccess: () => void
}) => {
  const { deletePost } = useDeletePost(resourcesDeleteProps, {
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const handleDelete = async () => {
    await deletePost({ variables: { id: resourcesDeleteProps.id } })
  }

  return (
    <>
      <Text>Are you sure to delete resource '{resourcesDeleteProps.title}'?</Text>
      <Space />
      <Button size={SIZE.SM} content="Delete" context="danger" onClick={handleDelete} />
    </>
  )
}
