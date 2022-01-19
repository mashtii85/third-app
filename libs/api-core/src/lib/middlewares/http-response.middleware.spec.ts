import { HttpResponseMiddleware } from './http-response.middleware'

describe('HttpResponseMiddleware', () => {
  it('should be defined', () => {
    expect(new HttpResponseMiddleware()).toBeDefined()
  })
})
