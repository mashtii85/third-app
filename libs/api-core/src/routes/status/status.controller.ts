import { Controller, Get, HttpCode, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('/status')
export class StatusController {
  @HttpCode(200)
  @Get()
  getStatus(@Res() response: Response): Response {
    return response.json({ message: 'success' })
  }
}
