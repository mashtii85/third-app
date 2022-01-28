import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { LoginDto, SwitchAccountDto } from './auth.dto'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body(new ValidationPipe()) credentials: LoginDto,
    @Res() response: Response
  ): Promise<Response> {
    return await this.authService.login(credentials, response)
  }

  @Post('/switch-account')
  async switchAccount(
    @Body(new ValidationPipe()) account: SwitchAccountDto,
    @Res() response: Response
  ): Promise<Response> {
    return response.status(200).json({ account: account })
  }
}
