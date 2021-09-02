import { useReducer } from 'react'
import styled, { css } from 'styled-components'
import { Center } from '../wrappers/horizontalCenter'
import { Button } from '@drykiss/industry-ui'

import { QuizActionTypes, QuizProps, QuizState } from './types'
import { calculateScore } from './helpers'

const reducer = (state: QuizState, action: QuizActionTypes) => {
  const newState = { ...state }
  switch (action.type) {
    case 'next': {
      newState.overAllScore = calculateScore(newState)
      newState.activeQuestionIndex++
      newState.selectedAnswers = []
      return { ...newState }
    }
    case 'finish': {
      const { questions } = newState
      newState.overAllScore = calculateScore(newState)
      let bestScore = 0
      questions.forEach((item) => {
        bestScore += item.correctAnswers.length
      })
      newState.finalScore = +((newState.overAllScore / bestScore) * 100).toFixed(0)
      newState.quizFinished = true
      // newState.selectedAnswers = []
      return { ...newState }
    }
    case 'setAnswerAction': {
      const selectedAnswerIndex = newState.selectedAnswers.indexOf(action.payload)
      if (selectedAnswerIndex !== -1) {
        newState.selectedAnswers.splice(selectedAnswerIndex, 1)
      } else {
        newState.selectedAnswers.push(action.payload)
      }

      return { ...newState }
    }
    case 'setOverAllScore': {
      newState.overAllScore = action.payload
      return { ...newState }
    }
    case 'reset': {
      return action.payload
    }
    default:
      throw new Error('Action not defined in question component')
  }
}

export const Quiz = ({ minimumScoreToPass = 50, ...props }: QuizProps) => {
  const { questions, onComplete } = props
  const [state, dispatch] = useReducer(reducer, {
    activeQuestionIndex: 0,
    overAllScore: 0,
    finalScore: 0,
    quizFinished: false,
    selectedAnswers: [],
    questions
  })
  const { activeQuestionIndex, finalScore, quizFinished, selectedAnswers } = state
  const isLastQuestion = activeQuestionIndex === questions.length - 1

  const activeQuestion = questions[activeQuestionIndex]

  const handleAnswerClick = (index: number) => {
    if (selectedAnswers.length === activeQuestion.correctAnswers.length) {
      if (selectedAnswers.indexOf(index) === -1) {
        return
      }
    }
    dispatch({ type: 'setAnswerAction', payload: index })
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
        overAllScore: 0,
        finalScore: 0,
        quizFinished: false,
        selectedAnswers: [],
        questions
      }
    })
  }

  return (
    <StyledQuestionsWrapper>
      <StyledProgressTitle>
        Question {activeQuestionIndex + 1} of {questions.length}
      </StyledProgressTitle>
      {quizFinished ? (
        <QuizFinishedWrapper>
          <p>overAllScore:{finalScore}%</p>
          {<CenterButton title="Reset" onClick={handleResetClick} />}
          {finalScore >= minimumScoreToPass && (
            <CenterButton title="Continue" onClick={() => onComplete(finalScore)} />
          )}
        </QuizFinishedWrapper>
      ) : (
        <>
          <StyledQuestion>{activeQuestion.question}</StyledQuestion>
          <MessageWrapper>
            please select {activeQuestion.correctAnswers.length} answer
            {activeQuestion.correctAnswers.length > 1 ? 's' : ''}
          </MessageWrapper>
          {activeQuestion.answers.map((item, index) => {
            return (
              <StyledAnswer
                key={index}
                selected={selectedAnswers.indexOf(index) !== -1}
                onClick={() => handleAnswerClick(index)}
              >
                {item}
              </StyledAnswer>
            )
          })}
          {selectedAnswers.length === activeQuestion.correctAnswers.length ? (
            <CenterButton title={isLastQuestion ? 'Finish' : 'Next'} onClick={handleNextClick} />
          ) : (
            <></>
          )}
        </>
      )}
    </StyledQuestionsWrapper>
  )
}
const CenterButton = ({ title, onClick }: { title: string; onClick: () => void }) => {
  return (
    <Center>
      <StyledActionButton context="secondary" onClick={onClick}>
        {title}
      </StyledActionButton>
    </Center>
  )
}
const QuizFinishedWrapper = styled(Center)`
  background-color: blue;
  flex-direction: column;
`
const StyledActionButton = styled(Button)``
const StyledProgressTitle = styled.p``
const MessageWrapper = styled.div`
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
`
const StyledAnswer = styled.div<{ selected: boolean }>`
  width: calc(100% - 4rem);
  margin-left: 2rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: skyblue;
  color: black;
  ${({ selected }) =>
    selected &&
    css`
      background-color: green;
    `}
`
const StyledQuestion = styled.p`
  padding: 2rem 1rem;
  background-color: skyblue;
  color: black;
  margin-bottom: 2rem;
`

const StyledQuestionsWrapper = styled.div`
  width: 100%;
  height: 500px;
  background-color: red;
`
