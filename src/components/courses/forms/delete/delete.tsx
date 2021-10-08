/**
 * Components - Courses - Delete - Delete
 */

import { SIZE } from '../../../../config/theme'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeleteCourse } from '../../hooks'
import { CourseFilter } from '../../hooks/types'

export const DeleteCourse = ({
  id,
  title,
  filters,
  onSuccess
}: {
  id: number
  filters: CourseFilter
  title: string
  onSuccess: () => void
}) => {
  const { deleteCourse } = useDeleteCourse({
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
