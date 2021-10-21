/**
 * Components - Courses - Resources - Forms - Upsert
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useCreatePost } from '../../../../posts/hooks/useCreate/useCreate'
import { useUpdatePost } from '../../../../posts/hooks/useUpdate/useUpdate'
import { useCreateMedia } from '../../../../media/hooks/useCreate/useCreate'
import { useCurrentUser } from '../../../../../utils/useCurrentUser'
import { useCreateResource } from '../../hooks/useCreate/useCreate'

// UI
import { Form, FormField, FormLabel, TextareaField, SelectField } from '@drykiss/industry-ui'
import { ResourcesSchema as schema } from './schema'
import { ResourceAttachmentForm } from '../attachment/form'

// Helpers
import { prepareMediumCreateType, prepareResourceCreateType } from './helpers'

// Types
import { ResourcesFormType, resourceType } from './types.d'
import { PostFilter } from '../../../../posts/hooks/usePost/types.d'
import { Post, RESOURCE_TYPE } from '../../../../../types/post.d'
import { STATUS_ACTIVE } from '../../../../../types/select.d'
import { DropzoneProps } from '../../../../../types/medium.d'
import { MediaFilter } from '../../../../media/hooks/useMedia/types.d'

export const ResourcesForm = ({
  defaultValues,
  onSuccess
}: {
  courseId?: number
  defaultValues: Partial<ResourcesFormType>
  onSuccess: () => void
}) => {
  const { user } = useCurrentUser()
  const { control, errors, handleSubmit, register } = useForm<ResourcesFormType>({
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

  const mediaFilters: Partial<MediaFilter> = {}
  const { createMedia } = useCreateMedia(mediaFilters, {
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const { createResource } = useCreateResource(filters, {
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

  const dropzoneProps: DropzoneProps = {
    accept: 'image/*,.pdf,.ppt,.pptx',
    disabled: false,
    multiple: false
  }

  const onSubmit = async (form: ResourcesFormType) => {
    if (!form.customFields && defaultValues.customFields)
      form.customFields = defaultValues.customFields
    const obj: Partial<Post> = {
      title: form.title,
      type: form.type,
      content: form.content,
      status: STATUS_ACTIVE.Active,
      custom_fields: form.customFields
    }
    if (defaultValues.id) {
      if (form.dropzone) {
        const media = await prepareMediumCreateType(user.client_id, form.dropzone, defaultValues)
        if (
          !defaultValues?.medium?.filename ||
          (media && defaultValues?.medium?.filename !== media[0].filename)
        ) {
          obj.custom_fields = {
            resource_type: RESOURCE_TYPE.File,
            filename: media[0]?.caption!,
            filesize: form?.dropzone && form?.dropzone[0] ? form?.dropzone[0]?.size : 0
          }
          await createMedia({ variables: { objects: media } })
        }
      }
      await updatePost({ variables: { id: defaultValues.id, changes: obj } })
    } else {
      if (form.dropzone && form.customFields?.resource_type === RESOURCE_TYPE.File) {
        const media = await prepareMediumCreateType(user.client_id, form.dropzone, defaultValues)
        const medium = prepareResourceCreateType(form, defaultValues, media[0])
        await createResource({ variables: { objects: [medium] } })
      } else {
        obj.account_id = defaultValues.accountId
        obj.entity_id = defaultValues.entityId
        obj.entity = defaultValues.entity
        obj.type = defaultValues.type
        await createPost({ variables: { objects: [obj] } })
      }
    }
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <FormField {...defaultOptions} name="id" type="hidden" />
      <FormField {...defaultOptions} name="type" type="hidden" />
      <FormLabel label="Resource Type">
        <SelectField {...defaultOptions} name="customFields.resource_type" options={resourceType} />
      </FormLabel>
      <ResourceAttachmentForm dropzoneProps={dropzoneProps} defaultOptions={defaultOptions} />
      <FormLabel label="Title">
        <FormField {...defaultOptions} name="title" />
      </FormLabel>
      <FormLabel label="Description">
        <TextareaField {...defaultOptions} name="content" rows={5} />
      </FormLabel>
    </Form>
  )
}
