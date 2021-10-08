/**
 * Components - Courses - Notes - Forms - Upsert
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// // Hooks
import { useCreatePost } from '../../../../posts/hooks/useCreate/useCreate'
import { useUpdatePost } from '../../../../posts/hooks/useUpdate/useUpdate'

// // UI
import { Form, FormField, FormLabel, TextareaField } from '@drykiss/industry-ui'
import { NotesSchema as schema } from './schema'

// Types
import { NotesFormType } from './types.d'
import { PostFilter } from '../../../../posts/hooks/usePost/types.d'
import { Post } from '../../../../../types/post.d'
import { STATUS_ACTIVE } from '../../../../../types/select.d'

export const NotesForm = ({
  defaultValues,
  onSuccess
}: {
  courseId?: number
  defaultValues: Partial<NotesFormType>
  onSuccess: () => void
}) => {
  const { control, errors, handleSubmit, register } = useForm<NotesFormType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const filters: Partial<PostFilter> = {
    accountId: defaultValues.accountId,
    entity: defaultValues.entity,
    entityId: defaultValues.entityId,
    type: defaultValues.type
  }
  const { createPost } = useCreatePost(filters, {
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const { updatePost } = useUpdatePost({
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const defaultOptions = { control, errors, register }

  const onSubmit = async (form: NotesFormType) => {
    const obj: Partial<Post> = {
      title: form.title,
      content: form.content,
      status: STATUS_ACTIVE.Active
    }
    if (defaultValues.id) {
      await updatePost({ variables: { id: defaultValues.id, changes: obj } })
    } else {
      obj.account_id = defaultValues.accountId
      obj.entity_id = defaultValues.entityId
      obj.entity = defaultValues.entity
      obj.type = defaultValues.type
      await createPost({ variables: { objects: [obj] } })
    }
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <FormLabel label="Title">
        <FormField {...defaultOptions} name="title" />
      </FormLabel>
      <FormLabel label="Content">
        <TextareaField {...defaultOptions} name="content" rows={5} />
      </FormLabel>
    </Form>
  )
}
