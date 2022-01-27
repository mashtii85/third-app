import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configuration } from './config/configuration'
import { validationSchema } from './config/validation'
import { GraphQLModule } from '@nestjs/graphql'
import { CoreResolver } from './core.resolver'
import { AuthService } from './routes/auth/auth.service'
import { AppService } from './routes/app/app.service'

import { ApiKeyMiddleware } from '@drykiss/nest-utils'

// Routes
import { AppController } from './routes/app/app.controller'
import { AuthController } from './routes/auth/auth.controller'
import { MediaController } from './routes/media/media.controller'
import { StatusController } from './routes/status/status.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    })
  ],
  controllers: [AppController, AuthController, MediaController, StatusController],
  providers: [CoreResolver, AppService, AuthService],
  exports: []
})
export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('/media*')
    consumer.apply(ApiKeyMiddleware).forRoutes('/app*')
  }
}
