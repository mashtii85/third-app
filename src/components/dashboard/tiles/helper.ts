/**
 * Components - Dashboard - view - Helper
 */

// UI
import type { DashboardTile, DashboardTileObjects } from './types.d'

export const getAdminTiles = (dashboardObjects: DashboardTileObjects): DashboardTile[] => {
  const GREEN = 'success'
  const LIGHT_RED = 'danger'
  const RED = 'warning'
  const prefix = '/dashboard/issues'

  return [
    {
      colourConfig: { 15: GREEN, 30: LIGHT_RED, 31: RED },
      title: 'Open Courses',
      to: `${prefix}`,
      value: dashboardObjects?.openCourses?.aggregate.totalCount || 0
    },
    {
      colourConfig: { 15: GREEN, 30: LIGHT_RED, 31: RED },
      title: 'Completed Courses',
      to: `${prefix}`,
      value: dashboardObjects?.completedCourses?.aggregate.totalCount || 0
    },
    {
      colourConfig: { 15: GREEN, 30: LIGHT_RED, 31: RED },
      title: 'Pending Courses',
      to: `${prefix}`,
      value: dashboardObjects?.pendingCourses?.aggregate.totalCount || 0
    },
    {
      colourConfig: { 15: GREEN, 30: LIGHT_RED, 31: RED },
      title: 'Total Number of Courses',
      to: `${prefix}`,
      value: dashboardObjects?.allCourses?.aggregate.totalCount || 0
    }
  ]
}
