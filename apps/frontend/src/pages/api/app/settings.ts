/**
 * Api - Settings
 *
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libs
import nc from 'next-connect'
import cors from 'cors'

// Services
import { getSettings } from '../../../services/settings'

// Utils
import { handlerOptions } from '../../../utils/api/handlers'
import { secretMiddleware } from '../../../utils/api/secret'

const handler = nc<NextApiRequest, NextApiResponse>(handlerOptions)

handler
  .use(cors())
  .use(secretMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const client_id = req.body.client_id || req.body.input?.client_id || 0

    const data: any = await getSettings(client_id)

    res.status(200).json({ ...data })
  })

export default handler
