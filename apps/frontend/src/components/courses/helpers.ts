/**
 * Components - ProgressBar - Course - Helper
 */

import {
  LessonProgress,
  LESSON_PROGRESS_STATUS,
  Medium,
  MEDIUM_CATEGORY,
  MEDIUM_TYPE,
  ProgressBarModel,
  Video
} from '@availabletowork/types'

export const progressData = (data: LessonProgress[]): ProgressBarModel => {
  const result: ProgressBarModel = { data: [], status: {} }
  let started = 0
  let pending = 0
  let completed = 0
  const total = data.length

  data.forEach((item) => {
    if (item.status === LESSON_PROGRESS_STATUS.Started) started++
    else if (item.status === LESSON_PROGRESS_STATUS.Completed) completed++
    else pending++
  })

  result.data = [
    { id: 1, label: 'started', value: started },
    { id: 2, label: 'pending', value: pending },
    { id: 3, label: 'completed', value: completed }
  ]

  result.status = { started, pending: total - (started + completed), completed, total }

  return result
}
export const parseVideos = (media: Medium[]): Video[] => {
  return media
    .filter((item) => item.type === MEDIUM_TYPE.Video && item.category === MEDIUM_CATEGORY.Lesson)
    .map((item) => ({
      title: '',
      desc: '',
      src: `${process.env.NEXT_PUBLIC_S3_CDN_URL}/${item?.filename}`
    }))
}
