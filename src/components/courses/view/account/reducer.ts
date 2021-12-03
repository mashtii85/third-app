/**
 * Components - Courses - View - Account - Reducer
 */

// Types
import { CourseState, CourseActionTypes } from './types.d'

export const reducer = (state: CourseState, action: CourseActionTypes): CourseState => {
  const newState = { ...state }

  switch (action.type) {
    case 'pageMode': {
      newState.pageMode = action.payload
      return { ...newState }
    }

    case 'activeLesson': {
      newState.hasActiveLesson = action.payload
      return { ...newState }
    }

    case 'selectedIds': {
      newState.selectedModuleId = action.payload.selectedModuleId
      newState.selectedLessonId = action.payload.selectedLessonId
      return { ...newState }
    }

    case 'changeSettings': {
      const {
        selectedModuleId,
        selectedLessonId,
        actionButtonCaption,
        canCompleteLesson,
        showNextLesson,
        completedLessonId
      } = action.payload
      if (selectedModuleId) newState.selectedModuleId = selectedModuleId
      if (selectedLessonId) newState.selectedLessonId = selectedLessonId
      if (actionButtonCaption) newState.actionButtonCaption = actionButtonCaption
      if (canCompleteLesson) newState.canCompleteLesson = canCompleteLesson
      if (showNextLesson) newState.showNextLesson = showNextLesson
      if (completedLessonId) newState.completedLessonId = completedLessonId
      return { ...newState }
    }

    case 'buttonCaption': {
      newState.actionButtonCaption = action.payload
      return { ...newState }
    }

    case 'canComplete': {
      newState.canCompleteLesson = action.payload
      return { ...newState }
    }

    case 'nextLesson': {
      newState.showNextLesson = action.payload
      return { ...newState }
    }

    case 'completedId': {
      newState.completedLessonId = action.payload
      return { ...newState }
    }

    case 'setLesson': {
      newState.currentLesson = action.payload
      return { ...newState }
    }

    case 'prepareLesson': {
      newState.currentLesson = action.payload
      return { ...newState }
    }

    case 'quizFinished': {
      newState.quizState = action.payload
      if (action.payload.passed) newState.canCompleteLesson = true
      return { ...newState }
    }

    case 'certificate': {
      newState.certificateModel = action.payload
      return { ...newState }
    }

    default:
      return { ...state }
  }
}
