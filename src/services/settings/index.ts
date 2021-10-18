/**
 * Services - Settings
 *
 */

// GQL
import { query } from '../graphqlClient'
import { GET_APP_SETTINGS } from './queries'

// Utils
import { TE } from '../../utils/api/errors'

export const getSettings = async (clientId: number): Promise<any> => {
  const { client, settings, taxonomies } = await query(GET_APP_SETTINGS, {
    clientId,
    includeClient: !!clientId
  })

  if (!settings) {
    TE('Error fetching app settings')
  }

  const appSettings = {
    config: client?.meta?.config || {},
    features: client?.meta?.features || {},
    settings,
    taxonomies: taxonomies || [],
    theme: client?.meta?.theme || {}
  }

  return appSettings
}
