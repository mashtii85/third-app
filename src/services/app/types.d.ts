/**
 * Services - Types.d
 */

import { Localization } from '../../translations/types'
import { CurrentUser } from '../../types/user'
import { QueryLazyOptions } from '@apollo/client'
import { Taxonomy } from '../../types/taxonomy'

export interface AppProps {
  children: JSX.Element | JSX.Element[]
  user: CurrentUser
}

export interface BrandType {
  logo: string
  logoCDN: boolean
  name: string
}

export interface Config {
  Brand: BrandType
}

export interface Features {
  learning: boolean
  events: boolean
  locations: boolean
}

export interface Settings {
  id: string
  value: Partial<{ version: string; enabled: boolean }>
}

export interface AppSettings {
  config: Config
  features: Features
  settings: Settings[]
  taxonomies: Taxonomy[]
  theme: {}
  localization: Localization
}
export interface AppContextType extends AppSettings {
  refetchSettings: (options?: QueryLazyOptions<{ client_id: number }> | undefined) => void
}
export enum SETTINGS_MODE {
  Maintenance = 'maintenanceMode'
}
