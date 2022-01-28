/**
 * Helpers - Logger
 */

export enum LOG_LEVEL {
  Error = 'error',
  Warn = 'warn',
  Info = 'info'
}

export const LOG = (message: any, type: LOG_LEVEL): void => {
  switch (type) {
    case 'error':
      console.error('API Error: ', message)
      break
    case 'warn':
      console.warn('API Warning: ', message)
      break
    default:
      console.info('API Info: ', message)
  }
}
