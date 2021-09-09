/**
 * Components - Taxonomy - List - Tabs
 */

// React
import { useMemo } from 'react'

// Next
import { useRouter } from 'next/router'

// UI
import { Tabs } from '@drykiss/industry-ui'
import TaxonomyList from './list'

const TaxonomyTabs = () => {
  const { query } = useRouter()

  const tab = useMemo(() => {
    return query.tab || 'course-categories'
  }, [query.tab])

  return (
    <Tabs key={tab}>
      <div
        active={tab === 'course-categories'}
        label="Course Categories"
        activeTab="Course Categories"
      >
        <TaxonomyList type="course-categories" title="Course Categories" />
      </div>
    </Tabs>
  )
}

export default TaxonomyTabs
