import { Controller, HttpCode, Post, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('/app')
export class AppController {
  @HttpCode(200)
  @Post('/settings')
  getStatus(@Res() response: Response): Response {
    // TODO: Fetch Settings
    return response.status(200).json({ message: 'settings' })
  }
}
