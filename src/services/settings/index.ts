/**
 * Services - Settings
 *
 */

// GQL
import { query } from '../graphqlClient'
import { GET_APP_SETTINGS } from './queries'

// Utils
import { TE } from '../../utils/api/errors'

export const getSettings = async (client_id: number): Promise<any> => {
  if (!client_id) {
    TE('Client ID is missing')
  }

  const { client, settings, taxonomies } = await query(GET_APP_SETTINGS, { client_id })

  if (!settings || !client) {
    TE('Error fetching app settings')
  }

  const appSettings = {
    config: client.meta?.config || {},
    features: client.meta?.features || {},
    settings,
    taxonomies: taxonomies || [],
    theme: client.meta?.theme || {}
  }

  return appSettings
}
