/**
 * Components - Dashboard - Tiles - types.d
 */

// Types
import type { User } from '../../../types/user.d'

export interface ColourConfig {
  [key: number]: string
}

export interface DashboardTile {
  title: string
  to: string
  colourConfig: ColourConfig
  value: number
}

export interface DashboardTileItem {
  aggregate: {
    totalCount: number
  }
}

export interface DashboardTileObjects {
  openCourses?: DashboardTileItem
  completedCourses?: DashboardTileItem
  pendingCourses?: DashboardTileItem
  allCourses?: DashboardTileItem
}

export interface DashboardOverviewProps {
  user: User
}

export interface TileItemProps {
  title: string
  to: string
  user: User
  value: number
  colourConfig: ColourConfig
}
