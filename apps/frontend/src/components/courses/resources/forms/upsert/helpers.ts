/**
 * Components - Courses - Resources - Forms - Attachments - Helpers
 */

// Hooks
import { uploadMediaToS3 } from '../../../../media/forms/create/helpers'

// UI
import { Path } from '@drykiss/industry-ui'

// Constants
import {
  ENTITIES,
  MEDIUM_CATEGORY,
  MEDIUM_TYPE,
  RESOURCE_TYPE,
  STATUS_ACTIVE
} from '@availabletowork/constants'

// Types
import {
  DropzoneType,
  Medium,
  PostCustomFields,
  ResourceCreateType,
  ResourcesFormType
} from '@availabletowork/types'

export const prepareMediumCreateType = async (
  clientId: number,
  dropzone: DropzoneType[],
  defaultValues: Partial<ResourcesFormType>
): Promise<Medium[]> => {
  const result: Medium[] = []
  await Promise.all(
    dropzone?.map(async (file) => {
      const data = await uploadMediaToS3(file, defaultValues?.type && defaultValues.type)
      const filename: string = data.key
      const ext = Path.extname(filename)
      result.push({
        client_id: clientId,
        entity: ENTITIES.Post,
        entity_id: defaultValues.id && defaultValues.id,
        type: getMediumTypeByFileExtension(ext && ext),
        status: STATUS_ACTIVE.Active,
        caption: file.name,
        category: MEDIUM_CATEGORY.Resource,
        filename,
        extension: ext
      })

      return result
    })
  )
  return result
}

export const prepareResourceCreateType = (
  form: ResourcesFormType,
  defaultValues: Partial<ResourcesFormType>,
  media: Medium
): any => {
  const customField: PostCustomFields = {
    resource_type: RESOURCE_TYPE.File,
    filename: media?.caption && media?.caption,
    filesize: form?.dropzone && form?.dropzone[0] ? form?.dropzone[0]?.size : 0
  }
  const result: ResourceCreateType = {
    caption: media?.caption,
    category: media?.category,
    client_id: media?.client_id,
    entity: ENTITIES.Post,
    extension: media?.extension,
    filename: media?.filename,
    status: media?.status,
    type: media?.type,
    post: {
      data: {
        account_id: defaultValues?.accountId,
        content: form?.content,
        entity: defaultValues?.entity && defaultValues.entity,
        entity_id: defaultValues?.entityId,
        status: defaultValues?.status,
        title: form?.title,
        type: defaultValues?.type,
        custom_fields: customField
      }
    }
  }
  return result
}

export const getMediumTypeByFileExtension = (ext: string): MEDIUM_TYPE => {
  switch (ext) {
    case 'srt':
    case '.srt':
    case 'vtt':
    case '.vtt':
    case 'pdf':
    case '.pdf':
    case 'ppt':
    case '.ppt':
    case 'pptx':
    case '.pptx':
      return MEDIUM_TYPE.Document
    case '.jpg':
    case 'jpg':
    case '.jpeg':
    case 'jpeg':
    case '.png':
    case 'png':
    case '.apng':
    case 'apng':
    case '.bmp':
    case 'bmp':
    case '.gif':
    case 'gif':
    case '.svg':
    case 'svg':
    case '.webp':
    case 'webp':
    case '.ico':
    case 'ico':
    case '.tiff':
    case 'tiff':
      return MEDIUM_TYPE.Image
    case '.mp4':
    case 'mp4':
    case '.mkv':
    case 'mkv':
    case '.flv':
    case 'flv':
    case '.mov':
    case 'mov':
    case '.webm':
    case 'webm':
    case '.avi':
    case 'avi':
    case '.qt':
    case 'qt':
    case '.oqv':
    case 'oqv':
    case '.wmv':
    case 'wmv':
    case '.mpg':
    case 'mpg':
    case '.mpeg':
    case 'mpeg':
      return MEDIUM_TYPE.Video
    default:
      throw new Error('Unknown file extension!')
  }
}
