/**
 * Components - Courses - Notes - Forms - Delete
 */

import { SIZE } from '../../../../../config/theme'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeletePost } from '../../../../posts/hooks/useDelete/useDelete'

// Types
import { PostDeleteType } from '../../../../posts/hooks/useDelete/types.d'

export const NotesDeleteForm = ({
  notesDeleteProps,
  onSuccess
}: {
  notesDeleteProps: PostDeleteType
  onSuccess: () => void
}) => {
  const { deletePost } = useDeletePost(notesDeleteProps, {
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const handleDelete = async () => {
    await deletePost({ variables: { id: notesDeleteProps.id } })
  }

  return (
    <>
      <Text>Are you sure to delete notes '{notesDeleteProps.title}'?</Text>
      <Space />
      <Button size={SIZE.SM} content="Delete" context="danger" onClick={handleDelete} />
    </>
  )
}
