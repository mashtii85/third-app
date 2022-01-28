/**
 * Components - Progress  - Course - ProgressBar
 */

// Styles
import styled, { css } from 'styled-components'

// UI
import { Progress, ProgressBar } from '@drykiss/industry-ui'

// Helpers
import { progressData } from './helpers'

// Constants
import { THEME_CONTEXT } from '@availabletowork/constants'

// Types
import { LessonProgress } from '@availabletowork/types'

interface CourseProgressBarProps {
  progressBarData: LessonProgress[]
}

export const CourseProgressBar = ({ progressBarData }: CourseProgressBarProps) => {
  const { status = {} } = progressData(progressBarData)

  const progress = Math.round(((status?.completed || 0) / (status?.total || 0)) * 100)

  return (
    <StyledHeader>
      <StyledProgress>
        <div>
          <p>
            <strong>Course Progress</strong>
          </p>
          <p>
            <strong>{progress}%</strong>
          </p>
        </div>
        <br />
        <Progress size="md">
          <ProgressBar animated context={THEME_CONTEXT.danger} now={progress}></ProgressBar>
        </Progress>
      </StyledProgress>
      <StyledStatus>
        <div>
          <strong>{status.pending}</strong>
          <strong>&nbsp;To Do</strong>
        </div>
        <div>
          <strong>{status.started}</strong>
          <strong>&nbsp;In Progress</strong>
        </div>
        <div>
          <strong>{status.completed}</strong>
          <strong>&nbsp;Done</strong>
        </div>
      </StyledStatus>
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  display: flex;
`
const StyledProgress = styled.div`
  flex: 9 !important;
  margin-right: 15px;

  div {
    display: flex;
    justify-content: space-between;
    border-radius: 4px;
    p {
      padding: 0;
      margin: 0;
      color: #003753;
      margin-bottom: 2px;
    }
  }
`
const statusSquare = (color: string) => css`
  content: '';
  width: 15px;
  height: 15px;
  border-radius: 2px;
  background-color: ${color};
  position: absolute;
  left: 0px;
  top: 4px;
`
const StyledStatus = styled.div`
  flex: 3 !important;
  line-height: 20px;
  margin-bottom: 30px;
  div {
    display: flex;
    text-align: center;
    padding-left: 25px;
    margin: 0px;
    font-size: 14px;
    white-space: nowrap;
    position: relative;
    margin-bottom: 4px;
    &:nth-child(1) {
      &::before {
        ${statusSquare('#2392DC')}
      }
    }
    &:nth-child(2) {
      &::before {
        ${statusSquare('#FFCA10')}
      }
    }
    &:nth-child(3) {
      &::before {
        ${statusSquare('#45BABE')}
      }
    }
  }
`
