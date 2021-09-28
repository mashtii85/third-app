/**
 * Components - Dashboard - Tiles - types.d
 */

// Types
import type { ACCOUNT_TYPE } from '../../../types/user.d'

export interface ColourConfig {
  [key: number]: string
}

export interface DashboardTile {
  title: string
  to: string
  colourConfig: ColourConfig
  value: number | 'loading...'
}

export interface DashboardTileItem {
  aggregate: {
    totalCount: number
  }
}

export interface ClientDashboardOverviewProps {
  clientId: number
}

export interface TileItemProps {
  title: string
  to: string
  accountType: ACCOUNT_TYPE
  value: number | 'loading...'
  colourConfig: ColourConfig
}
