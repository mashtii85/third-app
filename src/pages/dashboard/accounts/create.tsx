/**
 * Dashboard - categories - View
 */

// Next
import type { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import View from '../../../components/accounts/manage/manage'

const PageCreateAccountView: NextPage = () => {
  return <Dashboard View={<View />} />
}

export default PageCreateAccountView
