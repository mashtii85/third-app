/**
 * Components - Dashboard - Tiles - Hooks - Helpers
 */

import { LooseObject } from '../../../../types/object'

export const prepareTileData = ({ clientId }: { clientId?: number }): LooseObject => {
  const variables: LooseObject = {}
  if (clientId) {
    variables.clientId = clientId
  }
  return variables
}
