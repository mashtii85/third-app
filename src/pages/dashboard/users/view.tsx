/**
 *Dashboard - users -View
 */

 // Next
import type { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui';
import View from '../../../components/users/view'

const PageUserView: NextPage = () => {

  return (
    <Dashboard
      View={<View />} />
  )
}

export default PageUserView