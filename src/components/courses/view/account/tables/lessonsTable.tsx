/**
 * Components - Courses - View - Account - Table
 */

// Apollo
import { OperationVariables } from '@apollo/client'

// UI
import { Details2, Stepper, formatDateStandard, formatTime } from '@drykiss/industry-ui'
import { THEME_CONTEXT } from '../../../../../constants/themeContext'

// Helpers
import { startLesson } from './helper'

// Types
import { LESSON_PROGRESS_STATUS } from '../../../../../types/lessonProgress.d'
import { LESSON_TYPE, Lesson } from '../../../../../types/lesson.d'
import { Course } from '../../../../../types/course.d'
import { CurrentUser } from '../../../../../types/user.d'
import { LessonPageStateType } from '../types.d'
import { StepperActionModel, StepperModel } from '../../../../../types/stepper.d'
import { COURSE_PAGE_MODE } from '../../types.d'
import { Module } from '../../../../../types/module.d'

export const LessonsTable = ({
  user,
  course,
  stateHolder,
  hasActive,
  refetch
}: {
  user: CurrentUser
  course: Course
  stateHolder: LessonPageStateType
  hasActive: boolean
  refetch: (variables?: Partial<OperationVariables> | undefined) => {}
}) => {
  const prepareLessons = (module: Module): StepperModel[] => {
    const data: StepperModel[] = []

    let actionId = 0
    let isActive = false
    module?.lessons?.length &&
      module.lessons.forEach((lesson: Lesson) => {
        const progress = lesson.lesson_progresses[0]
        if (!hasActive && progress?.status !== LESSON_PROGRESS_STATUS.Completed) {
          hasActive = true
          isActive = true
          if (stateHolder.pageMode === COURSE_PAGE_MODE.Progress) {
            stateHolder.selectedModuleId = module.id
            stateHolder.selectedLessonId = lesson.id
          }
        } else isActive = false

        actionId++
        const current =
          progress?.status === undefined || progress?.status === LESSON_PROGRESS_STATUS.Pending

        const actionModel: StepperActionModel = {
          id: actionId,
          active:
            (isActive && !stateHolder.canCompleteLesson) ||
            progress?.status === LESSON_PROGRESS_STATUS.Completed,
          context: THEME_CONTEXT.primary,
          type: 'button',
          content: current ? 'Start lesson' : 'Continue lesson',
          handleClick: () =>
            startLesson(
              course.id!,
              course.title,
              `${user.name_first} ${user.name_last}`,
              lesson,
              stateHolder,
              refetch
            )
        }

        if (progress?.status === LESSON_PROGRESS_STATUS.Completed) {
          actionModel.context = 'opaqueRed'
          actionModel.content = 'View lesson'
        }

        data.push({
          id: lesson.id,
          label: lesson.title,
          highlighted: progress?.status === LESSON_PROGRESS_STATUS.Started,
          labelIcon:
            lesson.type === LESSON_TYPE.Quiz || lesson.type === LESSON_TYPE.Video
              ? lesson.type
              : undefined,
          date:
            progress?.status === LESSON_PROGRESS_STATUS.Completed
              ? `${formatDateStandard(progress.updated_at)} ${formatTime(progress.updated_at)}`
              : isActive && stateHolder.canCompleteLesson
                ? 'In progress ...'
                : null,
          status: progress?.status,
          actions: [actionModel]
        })
      })

    return data
  }

  return (
    <>
      {(course as Course)?.modules?.length &&
        (course as Course)?.modules?.map((m: Module) => (
          <Details2 key={m.id} open title={m.title}>
            <Stepper items={prepareLessons(m)} maxWidth="unset" />
          </Details2>
        ))}
    </>
  )
}
