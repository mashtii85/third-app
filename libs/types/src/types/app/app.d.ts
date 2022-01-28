/**
 * Services - Types.d
 */

// Types
import { QueryLazyOptions } from '@apollo/client'
import { CurrentUser, Localization, Taxonomy } from '..'

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
  theme: any
  localization: Localization
}
export interface AppContextType extends AppSettings {
  refetchSettings: (options?: QueryLazyOptions<{ client_id: number }> | undefined) => void
}
