/**
 * Helpers - Errors
 */

// Libs
import { HttpException, HttpStatus } from '@nestjs/common'

export const TE = (message: string, status: HttpStatus = 400): void => {
  let error = 'Bad Request'

  switch (status) {
    case 401:
      error = 'Unauthorized'
      break
    case 403:
      error = 'Forbidden'
      break
    case 404:
      error = 'Not Found'
      break
    case 500:
      error = 'Internal Server Error'
  }

  throw new HttpException({
    error,
    message,
    statusCode: status
  }, status);

}
