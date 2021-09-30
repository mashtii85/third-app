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
// import { TE } from '../../../utils/api/errors'

// Mocks
import { Users } from '../../../mocks/users'

const handler = nc<NextApiRequest, NextApiResponse>(handlerOptions)

handler.post((req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const user = Users.find((u) => u.email === req.body.email)

    if (!user || req.body.password !== 'Lms1234!') {
      return res.status(401).json({ error: 'Email or password not correct' })
    }

    const token = jwt.sign({ user }, process.env.JWT_PRIVATE_KEY, {
      algorithm: 'RS512',
      expiresIn: '7d'
    })

    res.status(200).json({ token, user })
  } else {
    res.status(400).json({ error: 'Bad Request' })
  }
})

export default handler
