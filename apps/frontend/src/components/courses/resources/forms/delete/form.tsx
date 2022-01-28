/**
 * Components - Courses - Resources - Forms - Delete
 */

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeletePost } from '../../../../posts/hooks/useDelete/useDelete'

// Constants
import { SIZE } from '@availabletowork/constants'

// Types
import { PostDeleteType } from '@availabletowork/types'

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
