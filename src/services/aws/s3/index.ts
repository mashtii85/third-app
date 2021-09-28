/**
 * Services - AWS - S3
 *
 */

// AWS
import S3 from 'aws-sdk/clients/s3'

// Config
import { Config } from '../../../config/config'

// Types
import { UploadParams } from './types'

const s3 = new S3({
  accessKeyId: Config.AWS?.id,
  apiVersion: '2006-03-01',
  region: Config.AWS?.region,
  s3ForcePathStyle: true,
  secretAccessKey: Config.AWS?.key
})

export const uploadS3 = (params: UploadParams): Promise<void> => {
  return new Promise((resolve, reject) => {
    const uploadParams = {
      Bucket: params.bucket,
      Key: `${params.folder}/${params.fileName}`,
      Body: params.buffer,
      ACL: 'public-read',
      ContentType: params.mimeType
    }

    s3.upload(uploadParams, (err: any, data: any) => {
      if (err) {
        reject(new Error(`upload failed - ${err}`))
      }

      if (data) {
        resolve(data)
      }
    })
  })
}
