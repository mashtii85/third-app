/**
 * Components - Common - Icons - Styles
 */

// UI
import styled, { css } from 'styled-components'

export const CustomSVG = styled.svg<{ size?: number }>`
  ${({ size }) => css`
    width: ${size ?? 80}px;
    height: ${size ?? 80}px;
  `};
  fill: 'none';
  /* transform: scale(3); */
`
