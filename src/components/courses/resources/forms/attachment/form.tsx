/**
 * Components - Courses - Resources - Forms - Attachments
 */

// React Hook Form
import { Control, useWatch } from 'react-hook-form'

// UI
import { FormField, FormLabel } from '@drykiss/industry-ui'
import { CourseAttachmentFileUploader } from './helpers'

// Types
import { DropzoneProps } from '../../../../../types/medium'

export const ResourceAttachmentForm = ({
  dropzoneProps,
  defaultOptions
}: {
  dropzoneProps: DropzoneProps
  defaultOptions: { control: Control }
}) => {
  const resourceTypeWatch = useWatch({
    control: defaultOptions?.control,
    name: 'customFields.resource_type'
  })

  return (
    <>
      <FormField {...defaultOptions} name="customFields.filename" type="hidden" />
      <FormField {...defaultOptions} name="customFields.filesize" type="hidden" />
      {resourceTypeWatch === 'file' && (
        <CourseAttachmentFileUploader
          dropzoneProps={dropzoneProps}
          defaultOptions={defaultOptions}
        />
      )}
      {resourceTypeWatch === 'link' && (
        <FormLabel label="Link">
          <FormField {...defaultOptions} name="customFields.link" />
        </FormLabel>
      )}
    </>
  )
}
