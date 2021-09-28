/**
 * Status
 *
 */

// Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Utils
import { apiHandler } from '../../utils/api/handler'

function handler(_req: NextApiRequest, res: NextApiResponse): void {
  res.status(200).json({ status: 'success' })
}

export default apiHandler(handler, ['GET'])
