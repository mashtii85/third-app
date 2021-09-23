/**
 * Components - Dashboard - view - Helper
 */

// UI
import type { DashboardTile } from './types.d'
import type { AdminTileData, ClientTileData } from './hooks/types.d'

import pages from '../../../config/pages'
// config / navigation / pages / pages
export const prepareClientTiles = (dashboardObjects?: ClientTileData): DashboardTile[] => {
  const GREEN = 'success'
  const LIGHT_RED = 'danger'
  const RED = 'warning'

  return [
    {
      colourConfig: { 15: GREEN, 30: LIGHT_RED, 31: RED },
      title: 'Active Courses',
      to: pages.dashboard.coursesClient.root,
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

export const prepareAdminTiles = (dashboardObjects?: AdminTileData): DashboardTile[] => {
  const GREEN = 'success'
  const LIGHT_RED = 'danger'
  const RED = 'warning'

  return [
    {
      colourConfig: { 15: GREEN, 30: LIGHT_RED, 31: RED },
      title: 'Active Clients',
      to: pages.dashboard.accounts.list,
      value: dashboardObjects?.activeClients.aggregate.count ?? 'loading...'
    }
  ]
}
