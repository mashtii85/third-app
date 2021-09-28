/**
 * Account - Sign In
 */

// Next
import type { NextPage } from 'next'

// UI
import { Column, Login, Page, Row } from '@drykiss/industry-ui'

const PageSignIn: NextPage = () => {
  return (
    <Page>
      <Row>
        <Column md={6} offset={{ md: 3 }}>
          <Login blockSubmitButton forgotPassword={false} pathSignUp="" showPassword />
        </Column>
      </Row>
    </Page>
  )
}

export default PageSignIn
