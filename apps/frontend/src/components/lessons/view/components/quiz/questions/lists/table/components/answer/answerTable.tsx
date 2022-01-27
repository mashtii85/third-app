/**
 * Components - Lessons - Questions - Lists - Tables - Components - Answer
 */

// UI

// Types
import { Taxonomy } from '@availabletowork/types'
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
