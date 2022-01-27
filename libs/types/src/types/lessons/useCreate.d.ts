import { Lesson, LESSON_STATUS, LESSON_TYPE, UseHookOutput } from '..'

export interface LessonCreateVariables {
  courseId?: number
  moduleId?: number
  title?: string
  description?: string
  type?: LESSON_TYPE
  content?: string
  status?: LESSON_STATUS
}

export interface LessonCreateData {
  lessons: { returning: Lesson[] }
}

export interface UseCreateLessonOutput extends UseHookOutput {
  createLesson: any
}
