import { LOG_LEVEL } from '@availabletowork/constants'
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'
// import { LOG_LEVEL } from '@availabletowork/types'
import { LOG } from '../utils/logger'

@Injectable()
export class HttpResponseMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: NextFunction) {
    if (req.url != '/')
      if (req.headers['api-key'] != '123') {
        LOG('api key is missing', LOG_LEVEL.Warn)
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'api key is missing'
          },
          HttpStatus.FORBIDDEN
        )
      }

    // res.status(500).json({ aa: JSON.stringify(res.body), a: '333' })
    next()
  }
}
