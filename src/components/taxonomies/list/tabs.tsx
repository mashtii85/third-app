/**
 * Components - Taxonomy - List - Tabs
 */

// React
import { useMemo } from 'react'

// Next
import { useRouter } from 'next/router'

// Hooks
import { useCurrentUser } from '../../../utils/useCurrentUser'

// UI
import { Tabs, Space } from '@drykiss/industry-ui'
import { Tab } from '../../common/tab'
import TaxonomyList from './list'
import { GroupTable } from '../../groups/lists/tables/table'

// Types
import { TAXONOMY_TYPE } from '../../../types/taxonomy.d'
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
            <Space />
            <GroupTable accountId={user.account_id} />
          </Tab>
          <Tab active={tab === TAXONOMY_TYPE.COURSE} label="Courses">
            <TaxonomyList type={TAXONOMY_TYPE.COURSE} title="Course Types" />
          </Tab>
          <Tab active={tab === TAXONOMY_TYPE.LOCATION} label="Locations">
            <TaxonomyList type={TAXONOMY_TYPE.LOCATION} title="Location Types" />
          </Tab>
          <Tab active={tab === TAXONOMY_TYPE.EVENT} label="Events">
            <TaxonomyList type={TAXONOMY_TYPE.EVENT} title="Event Types" />
          </Tab>
        </Tabs>
      )}
    </>
  )
}

export default TaxonomyTabs
