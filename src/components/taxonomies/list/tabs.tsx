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
import { TAXONOMY_TYPE } from '../../../types/taxonomy.d'

import { useCurrentUser } from '../../../utils/useCurrentUser'
import { ACCOUNT_TYPE } from '../../../types/account.d'
const TaxonomyTabs = () => {
  const { query } = useRouter()
  const { user } = useCurrentUser()
  const isAdminUser = user?.account_type === ACCOUNT_TYPE.Admin
  const tab = useMemo(() => {
    return query.tab || (isAdminUser ? TAXONOMY_TYPE.CLIENT : TAXONOMY_TYPE.MEMBER)
  }, [query.tab])

  return (
    <>
      {isAdminUser ? (
        <Tabs key={tab}>
          <Tab active={tab === TAXONOMY_TYPE.CLIENT} label="Clients">
            <TaxonomyList type={TAXONOMY_TYPE.CLIENT} title="Client Types" />
          </Tab>
        </Tabs>
      ) : (
        <Tabs key={tab}>
          <Tab active={tab === TAXONOMY_TYPE.MEMBER} label="Members">
            <TaxonomyList type={TAXONOMY_TYPE.MEMBER} title="Member Types" />
          </Tab>
          <Tab active={tab === TAXONOMY_TYPE.COURSE} label="Courses">
            <TaxonomyList type={TAXONOMY_TYPE.COURSE} title="Course Types" />
          </Tab>
          <Tab active={tab === TAXONOMY_TYPE.LOCATION} label="Locations">
            <TaxonomyList type={TAXONOMY_TYPE.LOCATION} title="Location Types" />
          </Tab>
        </Tabs>
      )}
    </>
  )
}

export default TaxonomyTabs
