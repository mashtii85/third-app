/**
 * Status
 *
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

// Utils
import { handlerOptions } from '../../src/utils/api/handlers'

const handler = nc<NextApiRequest, NextApiResponse>(handlerOptions)

handler.get((_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ status: 'success' })
})

export default handler
