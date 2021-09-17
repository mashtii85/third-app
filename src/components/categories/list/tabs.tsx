/**
 * Components - Taxonomy - List - Tabs
 */

// React
import { useMemo } from 'react'

// Next
import { useRouter } from 'next/router'

// UI
import { Tabs } from '@drykiss/industry-ui'
import { Tab } from '../../common/tab'

import TaxonomyList from './list'
import { TAXONOMY_TABS } from '../../../constants/tabs'
const TaxonomyTabs = () => {
  const { query } = useRouter()

  const tab = useMemo(() => {
    return query.tab || TAXONOMY_TABS.COURSE_CATEGORIES
  }, [query.tab])

  return (
    <Tabs key={tab}>
      <Tab
        active={tab === TAXONOMY_TABS.COURSE_CATEGORIES}
        label="Course Categories"
        activeTab="Course Categories"
      >
        <TaxonomyList type={TAXONOMY_TABS.COURSE_CATEGORIES} title="Course Categories" />
      </Tab>
      <Tab
        active={tab === TAXONOMY_TABS.ACCOUNT_CATEGORIES}
        label="Account Categories"
        activeTab="Account Categories"
      >
        <TaxonomyList type={TAXONOMY_TABS.ACCOUNT_CATEGORIES} title="Account Categories" />
      </Tab>
    </Tabs>
  )
}

export default TaxonomyTabs
