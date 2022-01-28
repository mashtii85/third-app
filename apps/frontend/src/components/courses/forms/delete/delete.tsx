/**
 * Components - Courses - Delete - Delete
 */

// Constants
import { SIZE } from '@availabletowork/constants'

//Types
import { CourseFilter } from '@availabletowork/types'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeleteCourse } from '../../hooks'

export const DeleteCourseForm = ({
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
