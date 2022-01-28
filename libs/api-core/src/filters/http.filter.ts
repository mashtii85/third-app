import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'
import { LOG, LOG_LEVEL } from '@drykiss/nest-utils'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    LOG(exception, LOG_LEVEL.Error)

    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const exceptionResponse: {} = exception.getResponse()

    response.status(status).json({
      message: [],
      ...exceptionResponse,
      timestamp: new Date().toISOString(),
      path: request.url
    })
  }
}
