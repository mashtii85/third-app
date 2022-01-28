/**
 * Auth - Login
 *
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libs
import nc from 'next-connect'
import cors from 'cors'

// Utils
import { handlerOptions } from '../../../utils/api/handlers'

// Services
import { login } from '../../../services/auth/login'

const handler = nc<NextApiRequest, NextApiResponse>(handlerOptions)

handler.use(cors()).post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body || req.body.input

  const loginData = await login(email, password)

  res.status(200).json(loginData)
})

export default handler
