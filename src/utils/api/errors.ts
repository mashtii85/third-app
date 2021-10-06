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

export const TE = (message: string, status: number = 500): void => {
  throw new AppError(message, status)
}

export const LOG = (err: AppError, type: LOG_LEVEL): void => {
  // Todo: Move logging to Sentry
  switch (type) {
    case 'error':
      console.error('API Error: ' + err.message)
      break
    case 'warn':
      console.warn('API Warning: ' + err.message)
      break
    default:
      console.info('API Info: ' + err.message)
  }
}

export const handleNoMatch = (req: NextApiRequest, res: NextApiResponse): void => {
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
}

export const handleErrors = (err: AppError, _req: NextApiRequest, res: NextApiResponse): void => {
  LOG(err, LOG_LEVEL.Error)

  return res.status(err.status || 500).json({ error: err.message })
}
