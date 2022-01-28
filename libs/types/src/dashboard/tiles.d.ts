/**
 * Components - Dashboard - Tiles - Overview - Types
 */

//Types
import { ACCOUNT_TYPE } from '@availabletowork/constants'
import { ColourConfig } from './overview'

export interface TileItemProps {
  title: string
  to: string
  accountType: ACCOUNT_TYPE
  value: number | 'loading...'
  colourConfig: ColourConfig
}

export interface DashboardTile {
  title: string
  to: string
  colourConfig: ColourConfig
  value: number | 'loading...'
}
