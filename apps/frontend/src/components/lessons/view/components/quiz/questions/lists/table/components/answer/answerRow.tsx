/**
 * Components - Lessons - Questions - Lists - Tables - Components - Answer
 */

// UI
import { Radio } from '../../../../../../../../../common/quiz/icons/radio'
import {
  AnswerImage,
  AnswerText,
  AnswerWrapper,
  StyledAnswer
} from '../../../../../../../../../common/quiz/quiz'
import { CheckBox } from '../../../../../../../../../common/quiz/icons/checkbox'

// Constants
import { MEDIUM_TYPE, QUIZ_QUESTION_TYPE } from '@availabletowork/constants'

// Types
import { Taxonomy } from '@availabletowork/types'

export const AnswerRow = ({ question, answer }: { question: Taxonomy; answer: Taxonomy }) => {
  // The medium category should be check too
  // medium.category===MEDIUM_CATEGORY
  const answerImage = answer?.media?.find((medium) => medium.type === MEDIUM_TYPE.Image)
  // How should answers store as a taxonomy?
  // Where should store answer type and answer text?
  const answerText = answer.name
  return (
    <>
      <StyledAnswer key={answer.id}>
        {question?.meta?.type === QUIZ_QUESTION_TYPE.SingleAnswer ? (
          <Radio checked={false} />
        ) : (
          <CheckBox checked={false} />
        )}
        <AnswerWrapper>
          {answerImage && <AnswerImage src={answerImage.filename} />}
          {answerText && <AnswerText>{answerText}</AnswerText>}
        </AnswerWrapper>
      </StyledAnswer>
    </>
  )
}
