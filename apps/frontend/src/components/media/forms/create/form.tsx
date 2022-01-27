/**
 * Components - Media - Forms - Create
 */

// React Hook Form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useCreateMedia } from '../../hooks/useCreate/useCreate'

// UI
import { Button, Dropzone, Form, Input, Label, Path } from '@drykiss/industry-ui'
import { MediaSchema as schema } from './schema'

// Helpers
import { uploadMediaToS3 } from './helpers'
import { useCurrentUser } from '../../../../utils/useCurrentUser'

// Types
import {
  MediaFormProps,
  MediaFormType,
  MediaSubmitFormType,
  Medium,
  DropzoneType
} from '@availabletowork/types'

export const MediaForm = ({
  filters,
  dropzoneProps,
  defaultValues = {},
  onSuccess
}: MediaFormProps) => {
  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register,
    watch
  } = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const { user } = useCurrentUser()
  const { createMedia } = useCreateMedia(filters, {
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const defaultOptions = {
    control,
    errors: errors || {},
    showError: true,
    register
  }

  const dropzoneWatch: DropzoneType[] = watch('dropzone')

  const onSubmit = async (form: MediaSubmitFormType) => {
    if (!form.dropzone) form.dropzone = dropzoneWatch

    const mediaProps: Medium[] = []

    await Promise.all(
      await form.dropzone?.map(async (file) => {
        const data = await uploadMediaToS3(file, defaultValues.type)

        if (data?.key) {
          const filename: string = data.key
          mediaProps.push({
            client_id: user.client_id,
            taxonomy_id: defaultValues.taxonomyId,
            entity: defaultValues.entity,
            entity_id: defaultValues.entityId,
            type: defaultValues.type,
            status: defaultValues.status,
            caption: file.name,
            category: defaultValues.category,
            filename,
            extension: Path.extname(filename)
          })
        }

        return mediaProps
      })
    )

    if (mediaProps.length) await createMedia({ variables: { objects: mediaProps } })
  }
  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <Label label="Caption"></Label>
      <Input {...defaultOptions} name="caption" type="hidden" />
      <Label label="Media" />
      <Controller
        {...defaultOptions}
        render={({ field: { onChange } }) => <Dropzone {...dropzoneProps} onChange={onChange} />}
        name="dropzone"
      />
      <Button content="Submit" type="submit" />
    </Form>
  )
}
