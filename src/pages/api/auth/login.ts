/**
 * Auth - Login
 *
 * Note: uses mock data to login
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'

// JWT
import jwt from 'jsonwebtoken'

// Mocks
import { Users } from '../../../mocks/users'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const user = Users.find(u => u.email === req.body.email)

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
}
