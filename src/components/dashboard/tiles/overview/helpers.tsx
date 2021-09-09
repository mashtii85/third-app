/**
 * Components - Dashboard - Tiles - Overview
 */

// UI
import { Column } from '@drykiss/industry-ui'

// Types
import type { TileItemProps } from '../types.d'
import { ACCOUNT_TYPE } from '../../../../types/account.d'

import { StyledTile } from '../styles'

export const TileItem = ({ title, to, accountType, value, colourConfig }: TileItemProps) => (
  <Column
    md={4}
    lg={accountType === ACCOUNT_TYPE.Client ? 2 : 3}
    sm={6}
    style={{ marginBottom: '1.8em' }}
  >
    <StyledTile rounded title={title} size="sm" colourConfig={colourConfig} to={to} body={value} />
  </Column>
)
