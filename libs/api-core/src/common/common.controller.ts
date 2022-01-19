import { Controller, Get, HttpCode, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller()
export class CommonController {
  @HttpCode(200)
  @Get('status')
  getStatus(@Res() response: Response): Response {
    return response.status(400).json({ message: 'success' })
  }
}
