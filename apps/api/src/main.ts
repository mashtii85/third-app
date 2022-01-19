/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import {
  HttpExceptionFilter,
  HttpSuccessInterceptor,
  LoggerInterceptor
} from '@availabletowork/api-core'

import { AppModule } from './app/app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new LoggerInterceptor(), new HttpSuccessInterceptor())
  const config = app.get(ConfigService)
  const globalPrefix = ''
  app.setGlobalPrefix(globalPrefix)
  const port = process.env.PORT ?? 3333
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)

  Logger.log(`Running in ${config.get('environment')} mode`)
}

bootstrap()
