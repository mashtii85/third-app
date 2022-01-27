/**
 * Media - Upload
 *
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libs
import nc from 'next-connect'
import mimetype from 'mimetype'
import multer from 'multer'
import cors from 'cors'
import fs from 'fs'

// UI
import { Path } from '@drykiss/industry-ui'

// Services
import { uploadS3 } from '../../../src/services/aws/s3'

// Utils
import { fileName } from '../../../src/utils/fileName'
import { handlerOptions } from '../../../src/utils/api/handlers'
import { TE } from '../../../src/utils/api/errors'

// Types
import { ApiUploadRequest } from '@availabletowork/types'
import { UploadParams } from '../../../src/services/aws/s3/types'
import { getMediumTypeByFileExtension } from '../../../src/components/courses/resources/forms/upsert/helpers'
import { AWS } from '../../../src/config/aws'
import { getMimeType } from '../mimeTypes'

const upload = multer({
  storage: multer.memoryStorage()
})

const uploadMiddleware = upload.single('file')

const handler = nc<NextApiRequest, NextApiResponse>(handlerOptions)

handler
  .use(cors())
  .use(uploadMiddleware)
  .post(async (req: ApiUploadRequest, res: NextApiResponse): Promise<void> => {
    const {
      body: { bucket, folder },
      file: { buffer, originalname }
    } = req

    const name = fileName(originalname)
    let mimeType = mimetype.lookup(originalname)

    const ext = originalname.split('.').pop()
    if (!mimeType) mimeType = getMimeType(ext)

    // If we're in the dev env
    if (AWS?.endpoint && AWS.endpoint.includes('localhost')) {
      // Copying uploaded file to localstack folder to keep them on DOCKER ENGINE restart
      const ext = Path.extname(originalname)
      const filetype = getMediumTypeByFileExtension(ext)
      const path = `../backend/localstack/files/${filetype}s/${name}`
      fs.writeFileSync(path, buffer)
    }

    const uploadParams: UploadParams = {
      fileName: name,
      mimeType,
      bucket,
      folder,
      buffer
    }
    const data: any = await uploadS3(uploadParams)

    if (data) {
      return res.status(200).json({ key: data?.key })
    } else {
      TE('Error uploading file')
      return res.status(400).json({ message: 'Error uploading file' })
    }
  })

export default handler

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, consume as stream
  }
}
