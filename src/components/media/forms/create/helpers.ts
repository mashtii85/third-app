/**
 * Components - Media - Forms - Create - Helpers
 */

// Types
import { DropzoneType } from '../../../../types/medium'

export const uploadMediaToS3 = async (file: DropzoneType, type: string): Promise<any> => {
  const bucket = process.env.NEXT_PUBLIC_S3_BUCKET || ''
  const uploadUrl = process.env.NEXT_PUBLIC_S3_UPLOAD_URL || ''
  const formData = new window.FormData()

  formData.append('file', file, file.name)
  formData.append('bucket', bucket)
  formData.append('folder', `${type}s`)

  // Upload document to AWS MS - get UUID returned
  const response = await window.fetch(uploadUrl, {
    method: 'POST',
    body: formData
  })

  return response.json()
}
