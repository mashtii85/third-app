/**
 * Error 403
 */

// Next
import type { NextPage } from 'next'

// UI
import { Page, Text } from '@drykiss/industry-ui'

const Page403: NextPage = () => {
  return (
    <Page pageHeading={{ heading: '403 ERROR PAGE – NOT AUTHORIZED' }}>
      <Text>Your account doesn't have access to this page.</Text>
    </Page>
  )
}

export default Page403
