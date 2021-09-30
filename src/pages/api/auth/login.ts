/**
 * Auth - Login
 *
 * Note: uses mock data to login
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libs
import jwt from 'jsonwebtoken'
import nc from 'next-connect'

// Utils
import { handlerOptions } from '../../../utils/api/handlers'

// GQL
import { query } from '../../../services/graphqlClient'
import { GET_USER_BY_EMAIL } from '../../../components/users/queries'

const handler = nc<NextApiRequest, NextApiResponse>(handlerOptions)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.email) {
    res.status(400).json({ error: 'Email missing' })
  }

  let user = null

  const data = await query(GET_USER_BY_EMAIL, { email: req.body.email })

  if (data?.user) {
    user = data.user[0]
  }

  if (!user || req.body.password !== 'Lms1234!') {
    return res.status(401).json({ error: 'Email or password not correct' })
  }

  const token = jwt.sign({ user }, process.env.JWT_PRIVATE_KEY, {
    algorithm: 'RS512',
    expiresIn: '7d'
  })

  res.status(200).json({ token, user })
})

export default handler
