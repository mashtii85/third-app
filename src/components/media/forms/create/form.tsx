/**
 * Components - Media - Forms - Create
 */

// React Hook Form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useCreateMedia } from '../../hooks/useCreate/useCreate'

// UI
import { Dropzone, Form, FormField, FormLabel } from '@drykiss/industry-ui'
import { AddButton } from '../../../common/buttons/addButton'
import { MediaSchema as schema } from './schema'

// Helpers
import { uploadMediaToS3 } from './helpers'
import { useCurrentUser } from '../../../../utils/useCurrentUser'

// Types
import { MediaFormType, MediaSubmitFormType } from './types.d'
import { Medium, DropzoneProps, DropzoneType } from '../../../../types/medium.d'
import { MediaFilter } from '../../hooks/useMedia/types.d'

export const MediaForm = ({
  filters,
  dropzoneProps,
  defaultValues,
  onSuccess
}: {
  filters: Partial<MediaFilter>
  dropzoneProps: DropzoneProps
  defaultValues: Partial<MediaFormType>
  onSuccess: (data: any) => void
}) => {
  const { control, errors, handleSubmit, register, watch } = useForm<MediaFormType>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })

  const { user } = useCurrentUser()
  const { loading, createMedia } = useCreateMedia(filters, {
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const defaultOptions = {
    control: control,
    errors: errors,
    register: register
  }

  const dropzoneWatch: DropzoneType[] = watch('dropzone')

  const onSubmit = async (form: MediaSubmitFormType) => {
    if (!form.dropzone) form.dropzone = dropzoneWatch

    const mediaProps: Medium[] = []

    await Promise.all(
      await form.dropzone?.map(async (file) => {
        const data = await uploadMediaToS3(file, 'image')
        const filename: string = data.key
        mediaProps.push({
          client_id: user.client_id!,
          entity: defaultValues.entity!,
          entity_id: defaultValues.entityId!,
          type: defaultValues.type!,
          status: defaultValues.status!,
          caption: file.name,
          category: defaultValues.category,
          filename,
          extension: filename?.split('.').pop()
        })

        return mediaProps
      })
    )
    if (mediaProps.length) return await createMedia({ variables: { objects: mediaProps } })
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      {/* <FormLabel label="Caption"></FormLabel> */}
      <FormField {...defaultOptions} name="caption" type="hidden" />
      <FormLabel label="Media" />
      <Controller {...defaultOptions} as={<Dropzone {...dropzoneProps} />} name="dropzone" />
      <AddButton content="Submit" type="submit" disabled={loading} handleClick={onSubmit} />
    </Form>
  )
}
