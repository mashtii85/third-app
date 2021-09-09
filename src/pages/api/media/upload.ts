/**
 * Media - Upload
 *
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libs
import mimetype from 'mimetype'

// Services
import { UploadParams, uploadS3 } from '../../../services/aws/s3'

// Utils
import { fileName } from '../../../utils/fileName'

// Types
interface UploadRequest extends NextApiRequest {
  file: any
}

export default async function handler(req: UploadRequest, res: NextApiResponse) {
  const {
    body: { bucket, folder },
    file: { buffer, originalname }
  } = req

  try {
    const name = fileName(originalname)
    const mimeType = mimetype.lookup(originalname)

    const uploadParams: UploadParams = {
      fileName: name,
      mimeType,
      bucket,
      folder,
      buffer
    }

    const data: any = await uploadS3(uploadParams)
    if (data) {
      res.status(200).json({ key: data?.key })
    }
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: 'Bad Request' })
  }

  res.status(200).json({ status: 'success' })
}
