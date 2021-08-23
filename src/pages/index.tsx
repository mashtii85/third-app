/**
 * Home
 */

// Next
import type { NextPage } from 'next'

// UI
import { Button, Details2, Icon } from '@drykiss/industry-ui'

const Home: NextPage = () => {
  return (
    <div>
      <Details2 fitParentHeight open title="Test">
        <Button>
          <Icon context="secondary" icon="bell" size="lg" />
        </Button>
      </Details2>
    </div>
  )
}

export default Home
