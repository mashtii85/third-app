/**
 * Components - Dashboard - Tiles - Overview - Types
 */

import { ACCOUNT_TYPE } from '../../../../../types/account.d'
import { ColourConfig } from '../../types'

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
