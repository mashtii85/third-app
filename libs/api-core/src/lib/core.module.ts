import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configuration } from './config/configuration'
import { validationSchema } from './config/validation'
import { GraphQLModule } from '@nestjs/graphql'
import { CoreResolver } from './core.resolver'
import { AuthController } from './auth/auth.controller'
import { CommonController } from './common/common.controller'
import { AuthService } from './auth/auth.service'
import { HttpResponseMiddleware } from './middlewares'
import { STATUS_ACTIVE } from '@availabletowork/constants'
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
  controllers: [AuthController, CommonController],
  providers: [CoreResolver, AuthService],
  exports: []
})
export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpResponseMiddleware).forRoutes('/*')
  }
}
