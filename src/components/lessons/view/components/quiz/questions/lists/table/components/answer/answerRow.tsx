/**
 * Components - Lessons - Questions - Lists - Tables - Components - Answer
 */

// UI
// import { Text } from '@drykiss/industry-ui'
import { Radio } from '../../../../../../../../../common/quiz/icons/radio'
import {
  AnswerImage,
  AnswerText,
  AnswerWrapper,
  StyledAnswer
} from '../../../../../../../../../common/quiz/quiz'
import { CheckBox } from '../../../../../../../../../common/quiz/icons/checkbox'

// Types
import { Taxonomy } from '../../../../../../../../../../types/taxonomy.d'
import { MEDIUM_TYPE } from '../../../../../../../../../../types/medium.d'
import { QUESTION_TYPE } from '../../../../form/upsert/type.d'

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
        {question?.meta?.type === QUESTION_TYPE.singleAnswer ? (
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
