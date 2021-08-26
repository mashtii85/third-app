/**
 * Components - ProfileHeader
 */
import styled from 'styled-components'
// UI
import {
  Avatar,
  Column,
  Container,
  Heading,
  Icon,
  Row,
} from '@drykiss/industry-ui';

const HeadingContent = ({ entity }) => {
  return (
    <>
      <StyledIcon context="primary" icon="building" />
      {entity.name}
    </>
  )
}

export const ProfileHeader = ({ entity}) => {
  return (
  <StyledHeader>
    <Container>
      <Row>
        <Column md={3}>
          <Avatar
            content={entity.name}
            context="primary"
          />
        </Column>
        <Column md={9}>
           <StyledHeading content={<HeadingContent entity={entity} />} noMargin />
        </Column>
      </Row>
    </Container>
  </StyledHeader>)
}

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