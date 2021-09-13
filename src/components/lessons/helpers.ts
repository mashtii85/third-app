/**
 * Components - Course - Lesson - Helper
 */

import { Course } from '../../types/course'
import { Lesson } from '../../types/lesson'
import { Module } from '../../types/module'

const getCurrentLesson = (
  course?: Course,
  selectedModuleId?: number,
  selectedLessonId?: number
) => {
  const currentLesson =
    course?.modules
      ?.find((module: Module) => module.id === selectedModuleId)
      ?.lessons?.find((lesson: Lesson) => lesson.id === selectedLessonId) || null
  return currentLesson
}

const getCurrentLessonProgress = (
  course?: Course,
  selectedModuleId?: number,
  selectedLessonId?: number
) => {
  const currentLesson = getCurrentLesson(course, selectedModuleId, selectedLessonId)
  return currentLesson?.lesson_progresses[0]
}

const findNextLesson = (course?: Course, selectedModuleId?: number, selectedLessonId?: number) => {
  const modules: Module[] = course?.modules
  if (modules === undefined || modules.length <= 0) return null

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
}

export { getCurrentLesson, getCurrentLessonProgress, findNextLesson }
