/**
 * Components - Chart  - Course - PieChart
 */
 import styled from 'styled-components'

 // UI
import { PieChart } from '@drykiss/industry-ui'
// helper
import { chartData } from './helpers';


const arg ={
  colorScheme: 'nivo',
  cornerRadius: 1,
  enableSlicesLabels:false,
  enableRadialLabels: false,
  innerRadius: 0.8,
}

export const CourseLessonPieChart = ({ pieData }) => {
  const { data = [], status = {} } = chartData(pieData);

  return (
  <StyledHeader>
    <StyledPieChart>
      <PieChart
        data={data}
        {...arg}
      />
    </StyledPieChart>
    <StyledChartInner>
     <p>{`${status.inProgress} / ${status.total}`}</p>
     <p>Lessons</p>
    </StyledChartInner>
    <StyledChartStatus>
      <div>
        <p>{status.todo}</p>
        <p>TO DO</p>
      </div>
      <div>
        <p>{status.inProgress}</p>
        <p>In Progress</p>
      </div>
      <div>
        <p>{status.done}</p>
        <p>Done</p>
      </div>
    </StyledChartStatus>
  </StyledHeader>)
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
`

const StyledChartInner = styled.div`
  color: #000000;
  font-weight: bold;
  position: absolute;
  top: 18px;
  text-align: center;
  left: 157px;
  line-height: 10px;
  p {
    &:nth-child(1) {
      font-size: 16px;
    }
    &:nth-child(2) {
      font-size: 12px;
      color:#9b9b9b;
      position: relative;
      top: -8px
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
      padding:0px;
      margin:0px;
      &:nth-child(1) {
        color:#000000;
        font-weight: bold;
      }
      &:nth-child(2) {
        color:#9e9e9e;
      }
    }
  }
`
