import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Response } from 'express'
import { LoginDto } from './auth.dto'

@Injectable()
export class AuthService {
  public async login(credentials: LoginDto, response: Response): Promise<Response> {
    if (credentials.email === 'uaefa@example.com' && credentials.password === 'Lms123!') {
      return response.status(200).json({ token: 'token' })
    }

    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: 'email or password is not correct'
      },
      HttpStatus.UNAUTHORIZED
    )
  }
}
