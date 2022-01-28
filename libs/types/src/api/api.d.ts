/**
 * Utils - Api - Types
 */

// Next
import type { NextApiRequest } from 'next'

export interface ApiUploadRequest extends NextApiRequest {
  file: any
}
