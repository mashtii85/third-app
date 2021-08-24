/**
 * Auth - Login
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'

// JWT
import jwt from 'jsonwebtoken'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Check for hardcoded credentials
    if (req.body.email === 'demo@realworldacademies.com' && req.body.password === 'Lms1234!') {
      // Generate token
      const user = { id: 1, type: 'user', email: 'demo@realworldacademies.com', nameFirst: 'Demo User', nameLast: 'RWA' }
      const token = jwt.sign({ user }, process.env.JWT_PRIVATE_KEY, {
        algorithm: 'RS512',
        expiresIn: '7d'
      })

      res.status(200).json({ token, user })
    } else {
      res.status(401).json({ error: 'Email or password not correct' })
    }
  } else {
    res.status(400).json({ error: 'Bad Request' })
  }
}
