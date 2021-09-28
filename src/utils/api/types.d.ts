/**
 * Utils - Api - Types
 */

// Next
import type { NextApiRequest } from 'next'

interface ApiUploadRequest extends NextApiRequest {
  file: any
}
