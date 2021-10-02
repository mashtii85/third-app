/**
 * Components - Module - Forms - Delete
 */

import { SIZE } from '../../../../config/theme'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeleteModule } from '../../hooks/useDelete/useDelete'

// Types
import { ModuleDeleteProps } from '../../hooks/useDelete/types.d'

export const ModuleDeleteForm = ({
  id,
  courseId,
  title,
  onSuccess
}: {
  id: number
  courseId: number
  title: string
  onSuccess: () => void
}) => {
  const moduleDeleteProps: ModuleDeleteProps = { id, courseId }
  const { deleteModule } = useDeleteModule(moduleDeleteProps, {
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const handleDelete = () => {
    deleteModule({ variables: { id: moduleDeleteProps.id } })
  }

  return (
    <>
      <Text context="danger" size="lg">
        If you delete this module, all its lessons will also be deleted!
      </Text>
      <Text>Are you sure to delete module '{title}'?</Text>
      <Space />
      <Button size={SIZE.SM} content="Delete" context="danger" onClick={handleDelete} />
    </>
  )
}
