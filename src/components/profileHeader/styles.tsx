/**
 * Components - ProfileHeader
 */

// Styles
import styled from 'styled-components'

// UI
import { Heading, Icon } from '@drykiss/industry-ui'

const StyledHeader = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  box-shadow: rgba(45, 62, 80, 0.12) 0 1px 5px 0;
  margin-bottom: 0.5rem;
  padding: 1rem 0;
`

const StyledHeading = styled(Heading)`
  font-size: 1rem;
  margin-top: 0.5rem;
`

const StyledIcon = styled(Icon)`
  margin-right: 0.5rem;
`

export { StyledHeader, StyledHeading, StyledIcon }
