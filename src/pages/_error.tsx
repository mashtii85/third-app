/**
 * Error 500
 */

// UI
import { Page, Text } from '@drykiss/industry-ui'

const ErrorPage = ({ statusCode = 500 }: { statusCode: number }) => {
  return (
    <Page pageHeading={{ heading: `${statusCode} ERROR PAGE` }}>
      <Text>An Error occurred</Text>
    </Page>
  )
}

export default ErrorPage
