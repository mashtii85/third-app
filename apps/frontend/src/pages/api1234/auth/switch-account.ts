/**
 * Auth - Switch Account
 *
 * Note: uses mock data to login
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libs
import nc from 'next-connect'
import cors from 'cors'

// Utils
import { handlerOptions } from '../../../utils/api/handlers'

// Services
import { switchAccount } from '../../../services/auth/switchAccount'

const handler = nc<NextApiRequest, NextApiResponse>(handlerOptions)

handler.use(cors()).post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { accountId } = req.body || req.body.input

  const loginData = await switchAccount(accountId, req.headers)

  res.status(200).json(loginData)
})

export default handler
