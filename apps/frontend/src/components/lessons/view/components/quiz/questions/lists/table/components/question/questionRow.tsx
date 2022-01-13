/**
 * Components - Lessons - Questions - Lists - Tables - Components - Question
 */

// UI
import { Text, Space } from '@drykiss/industry-ui'
import { AnswerTable } from '../answer/answerTable'
import { QuestionRowFooter } from './questionRowFooter'

// Types
import { Taxonomy } from '../../../../../../../../../../types/taxonomy.d'

export const QuestionRow = ({
  question,
  answers,
  onSuccess
}: {
  question: Taxonomy
  answers?: Taxonomy[]
  onSuccess: () => void
}) => {
  return (
    <>
      <Text key={`name-${question.id}`} align="start" content={question.name} />
      <Space />
      <AnswerTable key={`answers-${question.id}`} question={question} answers={answers} />
      <QuestionRowFooter question={question} onSuccess={onSuccess} />
      <Space />
    </>
  )
}
