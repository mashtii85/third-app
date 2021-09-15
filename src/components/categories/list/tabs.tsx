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
        active={tab === 'course-categories'}
        label="Course Categories"
      // activeTab="Course Categories"
      >
        <TaxonomyList type="course-categories" title="Course Categories" />
      </Tab>
    </Tabs>
  )
}

export default TaxonomyTabs
