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
    return query.tab || TAXONOMY_TABS.MEMBER_TYPES
  }, [query.tab])

  return (
    <Tabs key={tab}>
      <Tab active={tab === TAXONOMY_TABS.MEMBER_TYPES} label="Members">
        <TaxonomyList type={TAXONOMY_TABS.MEMBER_TYPES} title="Member Types" />
      </Tab>
      <Tab active={tab === TAXONOMY_TABS.COURSE_TYPES} label="Courses">
        <TaxonomyList type={TAXONOMY_TABS.COURSE_TYPES} title="Course Types" />
      </Tab>
    </Tabs>
  )
}

export default TaxonomyTabs
