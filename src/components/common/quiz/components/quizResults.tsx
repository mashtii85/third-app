import { useState } from 'react'
import styled, { css } from 'styled-components'

interface QuizResultsProps {
  passed: boolean
  bestScore: number
  finalScore: number
  correctAnswers: number
  onRetakeClick: () => void
  onDoneClick: () => void
}
const passedText = ['Congratulations.', 'You have passed the exam.']
const failedText = ['Sorry!', 'You failed the exam.']

const TwoPartText = ({ title, value, bold }: { title: string; value: string; bold?: boolean }) => {
  return (
    <TwoPartTextWrapper bold={bold}>
      <span>{title}</span>
      <span>{value}</span>
    </TwoPartTextWrapper>
  )
}

export const QuizResult = ({
  passed,
  bestScore,
  finalScore,
  correctAnswers,
  onRetakeClick,
  onDoneClick
}: QuizResultsProps) => {
  const [showCompleteButton, setShowCompleteButton] = useState(true)
  const handleDoneClick = () => {
    onDoneClick()
    setShowCompleteButton(false)
  }
  return (
    <>
      <Wrapper>
        <TitleWrapper passed={passed}>
          {(passed ? passedText : failedText).map((item, index) => {
            return <p key={index}>{item}</p>
          })}
        </TitleWrapper>
        <ContentWrapper>
          <TwoPartText title="Your score is " value={finalScore + '%'} bold />
          <TwoPartText title="Correct answers" value={correctAnswers + ''} />
          <TwoPartText title="Incorrect answers" value={bestScore - correctAnswers + ''} />
        </ContentWrapper>
      </Wrapper>
      <ActionButtonsWrapper>
        {!passed ? <RetakeButton onClick={onRetakeClick}>Retake</RetakeButton> : <div />}
        {showCompleteButton && (
          <DoneButton onClick={handleDoneClick}>Complete and continue</DoneButton>
        )}
      </ActionButtonsWrapper>
    </>
  )
}
const DoneButton = styled.button`
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLOUR.secondary};
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: white;
  min-width: 47px;
  height: 30px;
  cursor: pointer;
`
const RetakeButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.COLOUR.secondary};
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
`
const ActionButtonsWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`
const TwoPartTextWrapper = styled.p<{ bold?: boolean }>`
  font-size: 14px;
  line-height: 22px;
  width: 210px;
  display: flex;
  justify-content: space-between;
  ${({ theme }) => css`
    color: ${theme.COLOUR.darkText};
  `}
  ${({ bold }) =>
    bold &&
    css`
      span {
        font-weight: 700;
      }
    `}
`

const ContentWrapper = styled.div``
const TitleWrapper = styled.div<{ passed: boolean }>`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  p {
    margin: 0;
  }
  ${({ passed, theme }) => css`
    color: ${passed ? theme.COLOUR.success : theme.COLOUR.danger};
  `}
`
const Wrapper = styled.div`
  height: 262px;
`
