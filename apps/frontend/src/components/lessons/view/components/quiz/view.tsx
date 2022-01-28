/**
 * Components - Lessons - Components - Quiz
 */

// UI
import { Details } from '@drykiss/industry-ui'
import { LessonQuestionsTable } from './questions/lists/table/table'

// Constants
import { ENTITIES, STATUS_ACTIVE, TAXONOMY_TYPE } from '@availabletowork/constants'

// Helpers
import { QuestionsListToolbar } from './helpers'

export const LessonQuiz = ({ lessonId }: { lessonId: number }) => {
  return (
    <>
      <Details
        open
        key="question-list-header"
        title="Quiz Questions"
        toolbar={
          <QuestionsListToolbar
            entity={ENTITIES.Lesson}
            entityId={lessonId}
            type={TAXONOMY_TYPE.LessonQuestions}
            status={STATUS_ACTIVE.Active}
          />
        }
      >
        <LessonQuestionsTable
          key="lesson-questions-table"
          entity={ENTITIES.Lesson}
          entityId={lessonId}
          type={TAXONOMY_TYPE.LessonQuestions}
        />
      </Details>
    </>
  )
}
