/**
 * Utils - Api - Errors
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Utils
import { TE } from './errors'

export const secretMiddleware = (req: NextApiRequest, _res: NextApiResponse, next: any): void => {
  const requiredSecret = process.env.API_KEY
  const providedSecret = req.headers.api_key

  if (!providedSecret) {
    TE('API_KEY is missing', 403)
  }

  if (requiredSecret === providedSecret) {
    next()
  } else {
    TE('Invalid API_KEY', 403)
  }
}
