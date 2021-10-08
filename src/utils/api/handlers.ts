/**
 * Utils - Api - Handlers
 */

// Utils
import { handleErrors, handleNoMatch } from './errors'

export const handlerOptions = {
  onError: handleErrors,
  onNoMatch: handleNoMatch
}
