/**
 * Utils - Api - Errors
 */

// Next
import type { NextApiResponse } from 'next'

export const errorHandler = (err: any, res: NextApiResponse): void => {
  console.error('API Error: ' + err.message)

  return res.status(500).json({ error: err.message })
}

export const TE = (message: string, CustomException?: any): void => {
  if (CustomException) {
    throw new CustomException(message)
  }

  throw new Error(message)
}
