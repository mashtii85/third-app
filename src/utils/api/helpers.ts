/**
 * Utils - Api - Helpers
 */

export const getHeaderData = (headers: any): any => {
  const app = headers['x-app'] || null
  const appVersion = headers['x-app-version'] || null
  const userAgent = headers['user-agent'] || null

  return {
    app,
    appVersion,
    userAgent
  }
}
