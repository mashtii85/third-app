/**
 * Components - Courses - Delete - Delete
 */

import { SIZE } from '../../../../config/theme'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeleteCourse } from '../../hooks'

export const DeleteCourse = ({
  id,
  title,
  filters,
  clientId,
  onSuccess
}: {
  id: number
  clientId: number
  filters: any
  title: string
  onSuccess: () => void
}) => {
  const { deleteCourse } = useDeleteCourse({
    clientId: clientId,
    filters: filters,
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const handleDelete = () => {
    deleteCourse({ variables: { courseId: id } })
  }

  return (
    <>
      <Text>Are you sure to delete course '{title}'?</Text>
      <Space />
      <Button size={SIZE.SM} content="Delete" context="danger" onClick={handleDelete} />
    </>
  )
}
