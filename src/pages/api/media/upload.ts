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

// Services
import { uploadS3 } from '../../../services/aws/s3'

// Utils
import { fileName } from '../../../utils/fileName'
import { handlerOptions } from '../../../utils/api/handlers'
import { TE } from '../../../utils/api/errors'

// Types
import { ApiUploadRequest } from '../../../utils/api/types'
import { UploadParams } from '../../../services/aws/s3/types'
import { getMediumTypeByFileExtension } from '../../../components/courses/resources/forms/upsert/helpers'
import { AWS } from '../../../config/aws'

const upload = multer({
  storage: multer.memoryStorage()
})

const uploadMiddleware = upload.single('file')

const handler = nc<NextApiRequest, NextApiResponse>(handlerOptions)

handler
  .use(cors())
  .use(uploadMiddleware)
  .post(async (req: ApiUploadRequest, res: NextApiResponse) => {
    const {
      body: { bucket, folder },
      file: { buffer, originalname }
    } = req

    const name = fileName(originalname)
    const mimeType = mimetype.lookup(originalname)

    // If we're in the dev env
    if (AWS?.endpoint && AWS.endpoint.includes('localhost')) {
      // Copying uploaded file to localstack folder to keep them on DOCKER ENGINE restart
      const ext = originalname.split('.').pop()
      const filetype = getMediumTypeByFileExtension(ext)
      const path = `../api.realworldacademies.com/localstack/files/${filetype}s/${name}`
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
    }
  })

export default handler

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, consume as stream
  }
}
