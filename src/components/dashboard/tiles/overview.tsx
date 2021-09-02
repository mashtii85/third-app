/**
 * Components - Dashboard - Tiles - Overview
 */

// Apollo
// import { useApolloClient, useQuery } from '@apollo/client'
// import { GET_DASHBOARD_TILES } from './query'

// UI
import { Column, Row, Space } from '@drykiss/industry-ui'

// Types
import type { DashboardOverviewProps, DashboardTile, TileItemProps } from './types.d'
import { ACCOUNT_TYPE } from '../../../types/user.d'

import { StyledTile } from './styles'

import { getAdminTiles } from './helper'

// Mocks
import { FilteredCourses } from '../../../mocks/courses'

const TileItem = ({ title, to, user, value, colourConfig }: TileItemProps) => (
  <Column
    md={4}
    lg={user.account_type === ACCOUNT_TYPE.Client ? 2 : 3}
    sm={6}
    style={{ marginBottom: '1.8em' }}
  >
    <StyledTile rounded title={title} size="sm" colourConfig={colourConfig} to={to} body={value} />
  </Column>
)

let items: DashboardTile[] = []

export const DashboardOverview = ({ user }: DashboardOverviewProps) => {
  items = getAdminTiles(FilteredCourses())

  return (
    <>
      <Row justify="start">
        {items.map((item) => (
          <TileItem
            key={item.title}
            user={user}
            title={item.title}
            to={item.to}
            colourConfig={item.colourConfig}
            value={item.value}
          />
        ))}
      </Row>

      <Space marginBottom="md" />
    </>
  )
}
