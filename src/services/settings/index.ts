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
    clientId: clientId || 0,
    includeClient: !!clientId
  })

  if (!settings) {
    TE('Error fetching app settings')
  }

  // Set config
  let config = null

  if (client) {
    config = client?.meta?.config || {
      Brand: {
        name: client.name
      }
    }

    // Set themeLogo as config.Brand.logo
    if (client.media.length) {
      config.Brand.logo = client.media[0].filename
      config.Brand.logoCDN = true
    }
  }

  const appSettings = {
    config: config || {},
    features: client?.meta?.features || {},
    settings,
    taxonomies: taxonomies || [],
    theme: client?.meta?.theme || {}
  }

  return appSettings
}
