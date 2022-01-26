/**
 * Components - Dashboard - Tiles - Hooks - types.d
 */

// Types
import { ApolloError, DocumentNode } from '@apollo/client'
import { AggregateData } from '../../../../types/aggregateData'
import { DashboardTile } from './tiles/overview/tiles/tiles'

export interface ClientTileData {
  activeCourses: AggregateData
  enrolledCourses: AggregateData
  completedLessons: AggregateData
}

export interface AdminTileData {
  activeClients: AggregateData
}

export interface CourseAggregateVariables {
  clientId?: number
}

export interface UseTileDataOutput {
  items: DashboardTile[]
  error?: ApolloError
  loading: boolean
}

export interface UseTileDataProps {
  clientId?: number
  query: DocumentNode
  prepareTiles: (dashboardObjects?: any) => DashboardTile[]
}
