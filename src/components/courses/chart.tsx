/**
 * Components - Chart  - Course - PieChart
 */

// Styles
import styled from 'styled-components'

// UI
import { PieChart } from '@drykiss/industry-ui'

// Helpers
import { chartData } from './helpers'

// Types
import { LessonProgress } from '../../types/lessonProgress.d'

const arg = {
  colorScheme: 'nivo',
  cornerRadius: 1,
  enableSlicesLabels: false,
  enableRadialLabels: false,
  innerRadius: 0.8
}

interface CourseProgressChartProps {
  pieData: LessonProgress[]
}

export const CourseProgressChart = ({ pieData }: CourseProgressChartProps) => {
  const { data = [], status = {} } = chartData(pieData)

  return (
    <StyledHeader>
      <StyledPieChart>
        <PieChart data={data} {...arg} />
        <StyledChartInner>
          <p>{`${status.completed} / ${status.total}`}</p>
          <p>Lessons</p>
        </StyledChartInner>
      </StyledPieChart>
      <StyledChartStatus>
        <div>
          <p>{status.pending}</p>
          <p>TO DO</p>
        </div>
        <div>
          <p>{status.started}</p>
          <p>In Progress</p>
        </div>
        <div>
          <p>{status.completed}</p>
          <p>Done</p>
        </div>
      </StyledChartStatus>
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledPieChart = styled.div`
  height: 100px;
  width: 80px;
  position: relative;
`

const StyledChartInner = styled.div`
  color: #000000;
  font-weight: bold;
  position: absolute;
  top: 18px;
  text-align: center;
  left: 16px;
  line-height: 10px;
  p {
    &:nth-child(1) {
      font-size: 16px;
    }
    &:nth-child(2) {
      font-size: 12px;
      color: #9b9b9b;
      position: relative;
      top: -8px;
    }
  }
`

const StyledChartStatus = styled.div`
  display: flex;
  width: 100%;
  div {
    border-bottom-width: 5px;
    border-bottom-style: solid;
    width: 100%;
    white-space: nowrap;

    &:nth-child(1) {
      border-bottom-color: #4fc6ed !important;
    }

    &:nth-child(2) {
      border-bottom-color: #ffbd2f;
    }

    &:nth-child(3) {
      border-bottom-color: #62d082;
    }

    p {
      text-align: center;
      padding: 0px;
      margin: 0px;
      &:nth-child(1) {
        color: #000000;
        font-weight: bold;
      }
      &:nth-child(2) {
        color: #9e9e9e;
      }
    }
  }
`
