/**
 * Components - Lessons - Questions - Lists - Tables - Components - Question - Custom DOMs
 */

// Styles
import styled, { css } from 'styled-components'

export const SimulatedLink = styled.span`
  font-weight: bold;
  color: maroon;
  cursor: pointer;
`

export const CustomRow = styled.div`
  font-size: 12px;
  color: gray;
`

export const Title = styled.b`
  font-size: 13px;
  color: black;
`

export const Content = styled.p<{ height?: number }>`
  ${({ height }) => css`
    height: ${height ?? 66}px;
  `}
  margin: 0em;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 5px 0px;
`
export const DateSpan = styled.div`
  font-weight: bold;
  text-align: right;
  color: #adadad;
`
export const RightAlign = styled.div`
  font-weight: bold;
  text-align: right;
`
export const MaroonSpan = styled.span`
  a:link,
  a:visited {
    color: maroon;
  }
`
export const BlackSpan = styled.span`
  a:link,
  a:visited {
    color: black;
  }
`
