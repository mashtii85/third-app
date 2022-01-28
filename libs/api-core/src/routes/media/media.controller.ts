import { Controller, HttpCode, Post, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('/media')
export class MediaController {
  @HttpCode(200)
  @Post('/upload')
  getStatus(@Res() response: Response): Response {
    // TODO: Upload media
    return response.status(200).json({ message: 'media' })
  }
}
