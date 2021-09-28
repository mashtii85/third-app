/**
 * Components - Lessons - Form - Delete - Delete
 */

import { SIZE } from '../../../../config/theme'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeleteLesson } from '../../hooks/useDelete/useDelete'

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
