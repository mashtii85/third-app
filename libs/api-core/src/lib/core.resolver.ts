import { Float, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class CoreResolver {
  @Query(() => Float)
  uptime(): number {
    return process.uptime()
  }
}
