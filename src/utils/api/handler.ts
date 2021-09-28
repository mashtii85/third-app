/**
 * Utils - Api - Handler
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Utils
import { errorHandler } from './errors'

// Types
import { ApiUploadRequest } from './types'

export const apiHandler = (
  handler: (req: NextApiRequest | ApiUploadRequest, res: NextApiResponse) => Promise<void> | void,
  methods: string[]
) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const method: string = req?.method?.toUpperCase() || ''

      // Check Allowed HTTP methods
      if (!methods.includes(method)) {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
      }

      // Route handler
      return await handler(req, res)
    } catch (err) {
      // Global error handler
      errorHandler(err, res)
    }
  }
}
