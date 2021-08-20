import type { NextPage } from 'next'

// UI
import { Button, Details2, Icon } from '@drykiss/industry-ui'

const Home: NextPage = () => {
  return (
    <div>
      <Button title="Canvas View">
        <Icon context="secondary" icon="bell" size="lg" />
      </Button>
      {/* <Details2 fitParentHeight open title="Test">
        Some test component
      </Details2> */}
    </div>
  )
}

export default Home
