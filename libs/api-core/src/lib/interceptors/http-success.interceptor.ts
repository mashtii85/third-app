// import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
// import { Observable } from 'rxjs'

// export interface Response<T> {
//   statusCode: number;
//   message: string;
//   data: T;
// }

// @Injectable()
// export class HttpSuccessInterceptor<T> implements NestInterceptor<T, Response<T>> {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     console.log(context)
//     return next.handle()
//     // return next.handle().pipe(n => n
//     //   map((data) => ({
//     //   statusCode: context.switchToHttp().getResponse().statusCode,
//     //   message: data.message,
//     //       data: {
//     //     result: data.result,
//     //     meta: {} // if this is supposed to be the actual return then replace {} with data.result
//     //   }
//     // })
//     // ),
//     // )
//   }
// }

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  data: T
}

@Injectable()
export class HttpSuccessInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    // return next.handle()
    return next.handle().pipe(
      map((data) => {
        console.log(data)
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data.message,
          data: {
            ...data,
            result: data.result,
            meta: {}
          }
        }
      })
    )
  }
}
