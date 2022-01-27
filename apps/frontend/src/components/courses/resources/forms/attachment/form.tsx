/**
 * Components - Courses - Resources - Forms - Attachments
 */

// React Hook Form
import { Control, useWatch } from 'react-hook-form'

// UI
import { Input, Label } from '@drykiss/industry-ui'
import { CourseAttachmentFileUploader } from './helpers'

// Types
import { DropzoneProps } from '@availabletowork/types'

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
      <Input {...defaultOptions} name="customFields.filename" type="hidden" />
      <Input {...defaultOptions} name="customFields.filesize" type="hidden" />
      {resourceTypeWatch === 'file' && (
        <CourseAttachmentFileUploader
          dropzoneProps={dropzoneProps}
          defaultOptions={defaultOptions}
        />
      )}
      {resourceTypeWatch === 'link' && (
        <Label label="Link">
          <Input {...defaultOptions} name="customFields.link" />
        </Label>
      )}
    </>
  )
}
