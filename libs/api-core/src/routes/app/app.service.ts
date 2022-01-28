import { Injectable } from '@nestjs/common'
import { Response } from 'express'
import { query, TE } from '@drykiss/nest-utils'
import { GET_APP_SETTINGS } from '@availabletowork/queries'

@Injectable()
export class AppService {
  public async getSettings(clientId: number, response: Response): Promise<Response> {
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

    return response.json(appSettings)
  }
}
