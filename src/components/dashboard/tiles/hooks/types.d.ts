/**
 * Components - Dashboard - Tiles - Hooks - types.d
 */

// Types
import { ApolloError, DocumentNode } from '@apollo/client'
import { DashboardTile } from '../types.d'
import { AggregateData } from '../../../../types/aggregateData'

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
