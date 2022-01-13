/**
 * Dashboard - categories - View
 */

// Next
import type { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import Tabs from '../../../src/components/taxonomies/list/tabs'

const PageCategoriesView: NextPage = () => {
  return <Dashboard View={<Tabs />} />
}

export default PageCategoriesView
