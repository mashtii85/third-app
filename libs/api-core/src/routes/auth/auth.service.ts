import { Injectable } from '@nestjs/common'
import { Response } from 'express'
import { LoginDto } from './auth.dto'
import { login } from '@drykiss/auth'

@Injectable()
export class AuthService {
  public async login(credentials: LoginDto, response: Response): Promise<Response> {
    const loginData = await login(credentials.email, credentials.password)

    return response.json(loginData)
  }
}
