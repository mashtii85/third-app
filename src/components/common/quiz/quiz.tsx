import { ChangeEvent, useReducer } from 'react'
import styled from 'styled-components'
import { Center } from '../wrappers/horizontalCenter'
import { Button } from '@drykiss/industry-ui'

import { QuizActionTypes, QuizProps, QuizState } from './types'
import { calculateScore } from './helpers'
import { QUESTION_TYPE } from '../../../types/lesson.d'
import { Radio } from './icons/radio'
import { CheckBox } from './icons/checkbox'
import VideoPlayer from '../videoPlayer/videoPlayer'
import { QuizResult } from './components/quizResults'

const reducer = (state: QuizState, action: QuizActionTypes) => {
  const newState = { ...state }

  switch (action.type) {
    case 'setAnswerAction': {
      const selectedAnswerIndex = newState.selectedAnswers.indexOf(action.payload)
      if (selectedAnswerIndex !== -1) {
        newState.selectedAnswers.splice(selectedAnswerIndex, 1)
      } else {
        newState.selectedAnswers.push(action.payload)
      }
      return { ...newState }
    }
    case 'setNewAnswerAction': {
      newState.selectedAnswers = [action.payload]
      return { ...newState }
    }
    case 'setShortTextAnswerAction': {
      newState.shortAnsweredText = action.payload
      return { ...newState }
    }

    case 'next': {
      newState.overAllScore = calculateScore(newState)
      newState.activeQuestionIndex++
      newState.shortAnsweredText = ''
      newState.selectedAnswers = []
      return { ...newState }
    }

    case 'finish': {
      const { questions } = newState

      newState.overAllScore = calculateScore(newState)

      let bestScore = 0

      questions.forEach((item) => {
        if (item.type === QUESTION_TYPE.SelectAnswer) {
          bestScore += item.correctAnswers.length
        } else if (item.type === QUESTION_TYPE.ShortTextAnswer) {
          bestScore++
        } else {
          throw Error('Please implement score calculation for extra type')
        }
      })
      newState.bestScore = bestScore

      newState.finalScore = +((newState.overAllScore / bestScore) * 100).toFixed(0)

      newState.quizFinished = true

      return { ...newState }
    }

    case 'reset': {
      return action.payload
    }
    default:
      throw new Error('Action not defined in question component')
  }
}

export const Quiz = ({ minimumScoreToPass = 50, quizScoreInfo, ...props }: QuizProps) => {
  const { questions, onComplete } = props
  const alreadyHasScore = !!quizScoreInfo
  const [state, dispatch] = useReducer(reducer, {
    activeQuestionIndex: 0,
    finalScore: quizScoreInfo?.score ?? 0,
    overAllScore: 0,
    bestScore: 0,
    questions,
    quizFinished: alreadyHasScore,
    selectedAnswers: [],
    shortAnsweredText: ''
  })

  const { activeQuestionIndex, finalScore, quizFinished, selectedAnswers } = state

  const isLastQuestion = activeQuestionIndex === questions.length - 1

  const activeQuestion = questions[activeQuestionIndex]

  const handleAnswerClick = (index: number) => {
    if (activeQuestion.type === QUESTION_TYPE.SelectAnswer) {
      if (selectedAnswers.length === activeQuestion.correctAnswers.length) {
        if (activeQuestion.correctAnswers.length === 1) {
          dispatch({ type: 'setNewAnswerAction', payload: index })

          return
        }

        if (selectedAnswers.indexOf(index) === -1) {
          return
        }
      }

      dispatch({ type: 'setAnswerAction', payload: index })
    }
  }

  const handleShortAnswerChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'setShortTextAnswerAction', payload: e.target.value })
  }

  const handleVideoFinished = (videoIndex: number) => {
    console.log('video finished,index:' + videoIndex)
  }

  const handleNextClick = () => {
    if (isLastQuestion) {
      dispatch({ type: 'finish' })
      return
    }
    dispatch({ type: 'next' })
  }

  const handleResetClick = () => {
    dispatch({
      type: 'reset',
      payload: {
        activeQuestionIndex: 0,
        finalScore: 0,
        overAllScore: 0,
        bestScore: 0,
        questions,
        quizFinished: false,
        selectedAnswers: [],
        shortAnsweredText: ''
      }
    })
  }

  return (
    <StyledQuestionsWrapper>
      {!state.quizFinished && (
        <StyledProgressTitle>
          Question {activeQuestionIndex + 1} of {questions.length}
        </StyledProgressTitle>
      )}

      {quizFinished ? (
        <QuizFinishedWrapper>
          <QuizResult
            onRetakeClick={handleResetClick}
            onDoneClick={() =>
              onComplete({ score: finalScore, passed: finalScore >= minimumScoreToPass })
            }
            passed={finalScore >= minimumScoreToPass}
            bestScore={state.bestScore}
            finalScore={finalScore}
            correctAnswers={state.overAllScore}
          />
        </QuizFinishedWrapper>
      ) : (
        <>
          {activeQuestion.questionVideos && (
            <VideoPlayer
              videos={activeQuestion.questionVideos}
              onVideoFinished={handleVideoFinished}
            />
          )}

          {activeQuestion.questionImage && <QuestionImage src={activeQuestion.questionImage} />}
          <StyledQuestionText>{activeQuestion.questionText}</StyledQuestionText>
          {activeQuestion.type === QUESTION_TYPE.SelectAnswer && (
            <>
              <MessageWrapper>
                please select
                {activeQuestion.correctAnswers.length === 1 ? ' an' : ' one or more'} answer
                {activeQuestion.correctAnswers.length > 1 ? 's' : ''}
              </MessageWrapper>

              {activeQuestion.answers.map((item, index) => {
                const isSelected = selectedAnswers.indexOf(index) !== -1
                return (
                  <StyledAnswer key={index} onClick={() => handleAnswerClick(index)}>
                    {activeQuestion.correctAnswers.length === 1 ? (
                      <Radio checked={isSelected} />
                    ) : (
                      <CheckBox checked={isSelected} />
                    )}
                    <AnswerWrapper>
                      {item.answerImage && <AnswerImage src={item.answerImage} />}
                      {item.answerText && <AnswerText>{item.answerText}</AnswerText>}
                    </AnswerWrapper>
                  </StyledAnswer>
                )
              })}
              {selectedAnswers.length === activeQuestion.correctAnswers.length ? (
                <CenterButton
                  title={isLastQuestion ? 'Finish' : 'Next'}
                  onClick={handleNextClick}
                />
              ) : (
                <></>
              )}
            </>
          )}
          {activeQuestion.type === QUESTION_TYPE.ShortTextAnswer && (
            <>
              <ShortAnswerTextArea onChange={handleShortAnswerChange} />
              {state.shortAnsweredText.length > 0 ? (
                <CenterButton
                  title={isLastQuestion ? 'Finish' : 'Next'}
                  onClick={handleNextClick}
                />
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </StyledQuestionsWrapper>
  )
}
const CenterButton = ({ title, onClick }: { title: string; onClick: () => void }) => {
  return (
    <Center>
      <StyledActionButton context="primary" onClick={onClick}>
        {title}
      </StyledActionButton>
    </Center>
  )
}

const QuestionImage = styled.img`
  width: 100%;
`

const AnswerWrapper = styled.div``

const ShortAnswerTextArea = styled.textarea`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  width: calc(100% - 2rem);
  margin: 0 1rem;
`

const AnswerImage = styled.img`
  width: 200px;
  border-radius: 4px;
`

const AnswerText = styled.p`
  margin: 0;
  color: #595959;
  font-size: 12px;
`

const QuizFinishedWrapper = styled(Center)`
  flex-direction: column;
  padding-top: 4rem;
`

const StyledActionButton = styled(Button)``

const StyledProgressTitle = styled.p``

const MessageWrapper = styled.div`
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
`

const StyledAnswer = styled.div`
  cursor: pointer;
  margin-bottom: 1rem;
  margin-left: 2rem;
  padding: 0.5rem 1rem;
  width: calc(100% - 4rem);
  display: flex;
  gap: 1rem;
`

const StyledQuestionText = styled.p`
  color: #515151;
  margin-bottom: 2rem;
  font-size: 14px;
`
const StyledQuestionsWrapper = styled.div`
  min-height: 390px;
  width: 100%;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 16px;
`
