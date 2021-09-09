/**
 * Components - Dashboard - view - Helper
 */

// UI
import type { TileData, DashboardTile } from './types.d'

import path from '../../../config/navigation/client.json'

export const prepareClientTiles = (dashboardObjects?: TileData): DashboardTile[] => {
  const GREEN = 'success'
  const LIGHT_RED = 'danger'
  const RED = 'warning'

  return [
    {
      colourConfig: { 15: GREEN, 30: LIGHT_RED, 31: RED },
      title: 'Active Courses',
      to: path.dashboard.courses.root,
      value: dashboardObjects?.activeCourses.aggregate.count ?? 'loading...'
    },
    {
      colourConfig: { 15: GREEN, 30: LIGHT_RED, 31: RED },
      title: 'Completed Courses',
      to: ``,
      value: dashboardObjects?.completedLessons?.aggregate.count ?? 'loading...'
    },
    {
      colourConfig: { 15: GREEN, 30: LIGHT_RED, 31: RED },
      title: 'Enrolled Courses',
      to: ``,
      value: dashboardObjects?.enrolledCourses?.aggregate.count ?? 'loading...'
    }
  ]
}
