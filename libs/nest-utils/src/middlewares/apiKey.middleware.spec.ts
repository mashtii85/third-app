import { ApiKeyMiddleware } from './apiKey.middleware'

describe('ApiKeyMiddleware', () => {
  it('should be defined', () => {
    expect(new ApiKeyMiddleware()).toBeDefined()
  })
})
