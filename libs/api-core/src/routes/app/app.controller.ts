import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { AppService } from './app.service'

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/settings')
  async getStatus(
    @Body('client_id') client_id: number,
    @Res() response: Response): Promise<Response> {
    return await this.appService.getSettings(client_id, response)
  }
}
