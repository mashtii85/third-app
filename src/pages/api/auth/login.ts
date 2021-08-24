/**
 * Auth - Login
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'

// JWT
import jwt from 'jsonwebtoken'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    let user = null

    // Check for hardcoded credentials
    if (req.body.email === 'demo@realworldacademies.com' && req.body.password === 'Lms1234!') {
      user = {
        id: 1,
        account_type: 'user',
        email: 'demo@realworldacademies.com',
        name_first: 'Demo User',
        name_last: 'RWA'
      }
    } else if (req.body.email === 'admin@realworldacademies.com' && req.body.password === 'Lms1234!') {
      user = {
        id: 1,
        account_type: 'admin',
        email: 'admin@realworldacademies.com',
        name_first: 'Demo Admin',
        name_last: 'RWA'
    }
    } else {
      res.status(401).json({ error: 'Email or password not correct' })
      return null
    }

    // Generate token
    const token = jwt.sign({ user }, process.env.JWT_PRIVATE_KEY, {
      algorithm: 'RS512',
      expiresIn: '7d'
    })

    res.status(200).json({ token, user })
  } else {
    res.status(400).json({ error: 'Bad Request' })
  }
}
