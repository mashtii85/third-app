/**
 * Components - Dashboard - Tiles - Hooks - types.d
 */

// Types
import { ApolloError, DocumentNode } from '@apollo/client'
import { DashboardTile } from '../types.d'
import { AggregateData } from '../../../../types/aggregateData'

export interface TileData {
  activeCourses: AggregateData
  enrolledCourses: AggregateData
  completedLessons: AggregateData
}

export interface CourseAggregateVariables {
  accountId: number
}

export interface UseTileDataOutput {
  items: DashboardTile[]
  error?: ApolloError
  loading: boolean
}

export interface UseTileDataProps {
  accountId: number
  query: DocumentNode
  prepareTiles: (dashboardObjects?: TileData) => DashboardTile[]
}
