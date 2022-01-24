/**
 * Helpers - Errors
 */


// Types
import { LOG, LOG_LEVEL } from './logger'

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

export const handleErrors = (err: AppError, _req, res): void => {
  LOG(err.message, LOG_LEVEL.Error)

  return res.status(err.status || 500).json({ error: err.message })
}
