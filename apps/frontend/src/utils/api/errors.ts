/**
 * Utils - Api - Errors
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Types
import { LOG_LEVEL } from './types.d'

export class AppError extends Error {
  public status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'AppError'
    this.status = status
  }
}

export const TE = (message: string, status = 500): void => {
  throw new AppError(message, status)
}

export const LOG = (message: string, type: LOG_LEVEL): void => {
  switch (type) {
    case 'error':
      console.error('API Error: ' + message)
      break
    case 'warn':
      console.warn('API Warning: ' + message)
      break
    default:
      console.info('API Info: ' + message)
  }
}

export const handleNoMatch = (req: NextApiRequest, res: NextApiResponse): void => {
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
}

export const handleErrors = (err: AppError, _req: NextApiRequest, res: NextApiResponse): void => {
  LOG(err.message, LOG_LEVEL.Error)

  return res.status(err.status || 500).json({ error: err.message })
}
