/**
 * Components - Charts - Course - Helper
 */

import { LESSON_STATUS } from '../../types/lesson.d'
import { ProgressChartModel, LessonDataModel } from '../../types/pieChart.d'

export const chartData = (data: LessonDataModel[]) => {
  const result: ProgressChartModel = { data: [], status: {} }
  let started: number = 0
  let pending: number = 0
  let completed: number = 0
  const total = data.length

  data.forEach((item) => {
    if (item.status === LESSON_STATUS.Started) started++
    else if (item.status === LESSON_STATUS.Completed) completed++
    else pending++
  })

  result.data = [
    { id: 1, label: 'started', value: started },
    { id: 2, label: 'pending', value: pending }
  ]

  result.status = { started, pending, completed, total }

  return result
}
