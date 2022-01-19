import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { response, Response } from 'express'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  public async login(credential: LoginDto, response: Response): Promise<Response> {
    if (credential.email === 'uaefa@example.com' && credential.password === 'Lms123!') {
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
