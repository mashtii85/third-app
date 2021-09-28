/**
 * Utils - Api - Errors
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'

export const handleNoMatch = (req: NextApiRequest, res: NextApiResponse): void => {
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
}

export const handleErrors = (err: any, _req: NextApiRequest, res: NextApiResponse): void => {
  console.error('API Error: ' + err.message)

  return res.status(500).json({ error: err.message })
}

export const TE = (message: string, CustomException?: any): void => {
  if (CustomException) {
    throw new CustomException(message)
  }

  throw new Error(message)
}
