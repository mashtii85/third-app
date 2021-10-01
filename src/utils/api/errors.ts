/**
 * Utils - Api - Errors
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Types
import { LOG_LEVEL } from './types.d'

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

export const handleErrors = (err: any, _req: NextApiRequest, res: NextApiResponse): void => {
  LOG(err.message, LOG_LEVEL.Error)

  return res.status(500).json({ error: err.message })
}

export const TE = (message: string, CustomException?: any): void => {
  if (CustomException) {
    throw new CustomException(message)
  }

  throw new Error(message)
}
