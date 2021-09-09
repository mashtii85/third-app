/**
 * Components - Charts - Course - Helper
 */

import { LESSON_STATUS } from '../../types/lesson.d'
import { LessonProgress } from '../../types/lessonProgress'
import { Medium, MEDIUM_CATEGORY, MEDIUM_TYPE } from '../../types/medium.d'
import { ProgressChartModel } from '../../types/pieChart.d'
import { Video } from '../common/videoPlayer/type'

export const chartData = (data: LessonProgress[]) => {
  const result: ProgressChartModel = { data: [], status: {} }
  let started = 0
  let pending = 0
  let completed = 0
  const total = data.length

  data.forEach((item) => {
    if (item.status === LESSON_STATUS.Started) started++
    else if (item.status === LESSON_STATUS.Completed) completed++
    else pending++
  })

  result.data = [
    { id: 1, label: 'started', value: started },
    { id: 2, label: 'pending', value: pending },
    { id: 3, label: 'completed', value: completed }
  ]

  result.status = { started, pending: total - started, completed, total }

  return result
}
export const parseVideos = (media: Medium[]): Video[] => {
  return media
    .filter((item) => item.type === MEDIUM_TYPE.Video && item.category === MEDIUM_CATEGORY.Lesson)
    .map((item) => ({
      title: '',
      desc: '',
      src: item.filename
    }))
}
