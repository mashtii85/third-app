/**
 * Components - Lessons - Components - Quiz
 */

// UI
import { Details } from '@drykiss/industry-ui'
import { ENTITIES } from '../../../../../constants/entities'
import { LessonQuestionsTable } from './questions/lists/table/table'

// Hooks

// Helpers
import { QuestionsListToolbar } from './helpers'

// Types
import { TAXONOMY_TYPE } from '../../../../../types/taxonomy.d'
import { STATUS_ACTIVE } from '../../../../../types/select.d'

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
