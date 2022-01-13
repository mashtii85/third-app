/**
 * Utils - Api - Types
 */

// Next
import type { NextApiRequest } from 'next'

export interface ApiUploadRequest extends NextApiRequest {
  file: any
}

export enum LOG_LEVEL {
  Error = 'error',
  Warn = 'warn',
  Info = 'info'
}
