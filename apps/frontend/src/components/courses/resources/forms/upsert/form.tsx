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
import { Form, Input, Label, Textarea, Select } from '@drykiss/industry-ui'
import { ResourcesSchema as schema } from './schema'
import { ResourceAttachmentForm } from '../attachment/form'

// Helpers
import { prepareMediumCreateType, prepareResourceCreateType } from './helpers'

// Types
import {
  DropzoneProps,
  MediaFilter,
  Post,
  PostFilter,
  ResourcesFormType,
  RESOURCE_TYPE,
  STATUS_ACTIVE
} from '@availabletowork/types'
import { resourceType } from './constants'

export const ResourcesForm = ({
  defaultValues,
  onSuccess
}: {
  courseId?: number
  defaultValues: Partial<ResourcesFormType>
  onSuccess: () => void
}) => {
  const { user } = useCurrentUser()

  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register
  } = useForm<any>({
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

  const defaultOptions = { control, errors, register, showError: true }

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
            filename: media[0]?.caption ?? '',
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
      <Input {...defaultOptions} name="id" type="hidden" />
      <Input {...defaultOptions} name="type" type="hidden" />
      <Label label="Resource Type">
        <Select {...defaultOptions} name="customFields.resource_type" options={resourceType} />
      </Label>
      <ResourceAttachmentForm dropzoneProps={dropzoneProps} defaultOptions={defaultOptions} />
      <Label label="Title">
        <Input {...defaultOptions} name="title" />
      </Label>
      <Label label="Description">
        <Textarea {...defaultOptions} name="content" rows={5} />
      </Label>
    </Form>
  )
}
