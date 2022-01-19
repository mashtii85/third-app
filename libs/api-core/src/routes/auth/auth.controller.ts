import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { LoginDto, SwitchAccountDto } from './auth.dto'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(
    @Body(new ValidationPipe()) credential: LoginDto,
    @Res() response: Response
  ): Promise<Response> {
    const token = await this.authService.login(credential, response)
    return token
  }

  @Post('/switch-account')
  async switchAccount(
    @Body(new ValidationPipe()) account: SwitchAccountDto,
    @Res() response: Response
  ): Promise<Response> {
    return response.status(200).json({ account: account })
  }
}
