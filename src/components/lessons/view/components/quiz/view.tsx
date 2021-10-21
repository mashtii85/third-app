/**
 * Components - Lessons - Components - Quiz
 */

// UI
import { Details2 } from '@drykiss/industry-ui'
import { LessonQuestionsTable } from './questions/lists/table/table'

// Hooks

// Helpers

// Types

export const LessonQuiz = ({ lessonId }: { lessonId: number }) => {
  return (
    <>
      <Details2 open key={`quiz-content-${1}`} title="Quiz">
        <LessonQuestionsTable entity="lesson" entityId={lessonId} type="lesson-questions" />
      </Details2>
    </>
  )
}
