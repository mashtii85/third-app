/**
 * Types - PieChart
 */

import { LESSON_STATUS } from './lesson'

export interface LessonDataModel {
  id: number
  label: string
  status: LESSON_STATUS
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
