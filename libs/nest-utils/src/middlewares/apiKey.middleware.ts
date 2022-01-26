import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'
import { TE } from '../helpers/errors'

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction): void {
    if (!req.headers['api_key']) {
      TE('API KEY is missing', HttpStatus.FORBIDDEN)
    }

    if (req.headers['api_key'] !== process.env.API_KEY) {
      TE('Invalid API_KEY', HttpStatus.FORBIDDEN)
    }

    next()
  }
}
