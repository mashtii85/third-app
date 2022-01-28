/**
 * Components - Lessons - Form - Delete - Delete
 */

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeleteLesson } from '../../hooks/useDelete/useDelete'

// Constants
import { SIZE } from '@availabletowork/constants'

export const DeleteLessonForm = ({
  id,
  moduleId,
  title,
  onSuccess
}: {
  id: number
  moduleId: number
  title: string
  onSuccess: () => void
}) => {
  const { deleteLesson } = useDeleteLesson(moduleId, {
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const handleDelete = () => {
    deleteLesson({ variables: { id: id } })
  }

  return (
    <>
      <Text>Are you sure to delete lesson '{title}'?</Text>
      <Space />
      <Button size={SIZE.SM} content="Delete" context="danger" onClick={handleDelete} />
    </>
  )
}
