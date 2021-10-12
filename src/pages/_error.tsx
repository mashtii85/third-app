/**
 * Error 500
 */

// Next
import type { NextPage } from 'next'

// UI
import { Page, Text } from '@drykiss/industry-ui'

const ErrorPage: NextPage = ({ statusCode }) => {
  return (
    <Page pageHeading={{ heading: '500 ERROR PAGE – NOT FOUND' }}>
      <Text>An Error occurred</Text>
    </Page>
  )
}

export default ErrorPage
