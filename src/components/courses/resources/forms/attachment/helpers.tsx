/**
 * Components - Courses - Resources - Forms - Attachments - Helpers
 */

// React Hook Form
import { Control, Controller, useWatch } from 'react-hook-form'

// UI
import { Button, Dropzone, FormLabel } from '@drykiss/industry-ui'

// types
import { DropzoneProps, DropzoneType } from '../../../../../types/medium.d'
import { SIZE } from '../../../../../config/theme'
import { THEME_CONTEXT } from '../../../../../constants/themeContext'
import { useState } from 'react'

const sizeCalculator = (size: number): string => {
  const rounded = Math.round(size / 1024)
  if (size >= 1048576) return `${rounded}mb`
  if (size >= 1024) return `${rounded}kb`
  return `${size}b`
}

export const fileinfo = (name: string, size: number): string => {
  return `${name} / ${sizeCalculator(size)}`
}

export const CourseAttachmentFileUploader = ({
  dropzoneProps,
  defaultOptions
}: {
  dropzoneProps: DropzoneProps
  defaultOptions: { control: Control }
}) => {
  const nofile = 'No file'
  const dropzoneWatch: DropzoneType[] | undefined = useWatch({
    control: defaultOptions?.control,
    name: 'dropzone'
  })
  const filenameWatch: string | undefined = useWatch({
    control: defaultOptions?.control,
    name: 'customFields.filename'
  })
  const filesizeWatch: number | undefined = useWatch({
    control: defaultOptions?.control,
    name: 'customFields.filesize'
  })

  const uploadNewFile = (): void => {
    if (!showDropzone) setShowDropzone(true)
  }

  const filename = (): string => {
    if (dropzoneWatch && dropzoneWatch[0])
      return fileinfo(dropzoneWatch[0].name, dropzoneWatch[0].size)
    return filenameWatch ? fileinfo(filenameWatch, filesizeWatch ?? 0) : nofile
  }
  const [showDropzone, setShowDropzone] = useState<boolean>(filename() === nofile)

  return (
    <>
      <FormLabel label={filename()} />
      {showDropzone ? (
        <>
          <Controller
            key="dropzone-controller"
            {...defaultOptions}
            as={<Dropzone key="dropzone-tag" {...dropzoneProps} />}
            name="dropzone"
          />
        </>
      ) : (
        <Button
          size={SIZE.SM}
          context={THEME_CONTEXT.secondary}
          content="Upload new file"
          onClick={uploadNewFile}
        />
      )}
    </>
  )
}
