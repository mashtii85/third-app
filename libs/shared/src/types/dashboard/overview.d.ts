/**
 * Components - Dashboard - Tiles - Overview - Types
 */

export interface ColourConfig {
  [key: number]: string
}

export interface ClientDashboardOverviewProps {
  clientId: number
}

export interface DashboardTileItem {
  aggregate: {
    totalCount: number
  }
}
