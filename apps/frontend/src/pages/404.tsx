/**
 * Error 404
 */

// Next
import type { NextPage } from 'next'

// UI
import { Page, Text } from '@drykiss/industry-ui'

const Page404: NextPage = () => {
  return (
    <Page pageHeading={{ heading: '404 ERROR PAGE – NOT FOUND' }}>
      <Text>
        The page you were looking for no longer exists or never did. Please use the links at the top
        of your screen to get back in the game, or click here to go home and start again.
      </Text>
    </Page>
  )
}

export default Page404
