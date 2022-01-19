import { Controller, UseFilters } from '@nestjs/common'
import { HttpExceptionFilter } from '@availabletowork/api-core'

import { AppService } from './app.service'

@Controller()
@UseFilters(new HttpExceptionFilter())
export class AppController {
  constructor(private readonly appService: AppService) {}
}
