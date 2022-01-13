/**
 * Components - Lessons - Helpers
 */

import { Course } from '../../types/course'
import { Lesson } from '../../types/lesson'
import { LessonProgress } from '../../types/lessonProgress'
import { Module } from '../../types/module'

const getCurrentLesson = (
  course: Course,
  selectedModuleId: number,
  selectedLessonId: number
): Lesson | null => {
  const currentLesson =
    course.modules
      ?.find((module: Module) => module.id === selectedModuleId)
      ?.lessons?.find((lesson: Lesson) => lesson.id === selectedLessonId) || null
  return currentLesson
}

const getCurrentLessonProgress = (
  course: Course,
  selectedModuleId: number,
  selectedLessonId: number
): LessonProgress | undefined => {
  const currentLesson = getCurrentLesson(course, selectedModuleId, selectedLessonId)
  return currentLesson?.lesson_progresses[0]
}

const findNextLesson = (
  course: Course,
  selectedModuleId?: number,
  selectedLessonId?: number
): {
  selectedModuleId: number
  selectedLessonId: number
} | null => {
  if (!course.modules || course.modules.length <= 0) return null
  const modules = course.modules
  let readyForSelect = false
  for (const module of modules) {
    for (const lesson of module.lessons ?? []) {
      if (readyForSelect) {
        return {
          selectedModuleId: module.id,
          selectedLessonId: lesson.id
        }
      } else if (module.id === selectedModuleId && lesson.id === selectedLessonId) {
        readyForSelect = true
      }
    }
  }
  return null
}
const findPreviousLesson = (
  course: Course,
  selectedModuleId?: number,
  selectedLessonId?: number
): {
  selectedModuleId: number
  selectedLessonId: number
} | null => {
  const allArr = []
  if (!course.modules || course.modules.length <= 0) return null
  const modules = course.modules
  for (const module of modules) {
    if (module.lessons) {
      for (let i = 0; i < module.lessons?.length; i++) {
        const lesson = module.lessons[i]
        const moduleId = module.id
        const lessonId = lesson.id
        allArr.push({
          selectedModuleId: moduleId,
          selectedLessonId: lessonId
        })
      }
    }
  }
  for (let i = 0; i < allArr.length; i++) {
    if (
      i !== 0 &&
      allArr[i].selectedLessonId === selectedLessonId &&
      allArr[i].selectedModuleId === selectedModuleId
    ) {
      return allArr[i - 1]
    }
  }
  return null
}

const getLessonNumber = (
  course: Course,
  selectedModuleId?: number,
  selectedLessonId?: number
): number => {
  if (!course.modules || course.modules.length <= 0) return 0
  const modules = course.modules
  const allArr = []

  for (const module of modules) {
    if (module.lessons) {
      for (let i = 0; i < module.lessons?.length; i++) {
        const lesson = module.lessons[i]
        const moduleId = module.id
        const lessonId = lesson.id
        allArr.push({
          selectedModuleId: moduleId,
          selectedLessonId: lessonId
        })
      }
    }
  }
  for (let i = 0; i < allArr.length; i++) {
    if (
      i !== 0 &&
      allArr[i].selectedLessonId === selectedLessonId &&
      allArr[i].selectedModuleId === selectedModuleId
    ) {
      return i
    }
  }
  return 0
}

export {
  getCurrentLesson,
  getCurrentLessonProgress,
  findNextLesson,
  findPreviousLesson,
  getLessonNumber
}
