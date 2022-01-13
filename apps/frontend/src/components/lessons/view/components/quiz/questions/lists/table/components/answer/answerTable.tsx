/**
 * Components - Lessons - Questions - Lists - Tables - Components - Answer
 */

// UI

// Types
import { Taxonomy } from '../../../../../../../../../../types/taxonomy.d'
import { AnswerRow } from './answerRow'

export const AnswerTable = ({
  question,
  answers
}: {
  question: Taxonomy
  answers?: Taxonomy[]
}) => {
  return (
    <>
      {answers?.map((answer) => {
        return <AnswerRow key={answer.id} question={question} answer={answer} />
      })}
    </>
  )
}
