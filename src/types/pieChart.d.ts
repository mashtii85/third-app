/**
 * Types - PieChart
 */

import { LessonStatus } from './lesson'

export interface LessonDataModel {
  id: number
  label: string
  status: LessonStatus
}

export interface ProgressChartData {
  id: number
  label: string
  value: number
}

export interface ProgressChartModel {
  data: ProgressChartData[]
  status: {
    started?: number
    pending?: number
    completed?: number
    total?: number
  }
}
