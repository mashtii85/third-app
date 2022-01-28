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
import { Tabs, TabItem, Space } from '@drykiss/industry-ui'
import TaxonomyList from './list'
import { GroupTable } from '../../groups/lists/tables/table'

// Constants
import { ACCOUNT_TYPE, TAXONOMY_TYPE } from '@availabletowork/constants'

const TaxonomyTabs = () => {
  const { query } = useRouter()
  const { user } = useCurrentUser()

  const isAdmin = user?.account_type === ACCOUNT_TYPE.Admin
  const tab = useMemo(() => {
    return query.tab || (isAdmin ? TAXONOMY_TYPE.Client : TAXONOMY_TYPE.Member)
  }, [query.tab])

  return (
    <>
      {!isAdmin ? (
        <Tabs key={tab}>
          <TabItem active={tab === TAXONOMY_TYPE.Member} label="Members">
            <TaxonomyList
              clientId={user?.client_id}
              type={TAXONOMY_TYPE.Member}
              title="Member Types"
            />
            <Space />
            <GroupTable accountId={user?.account_id} />
          </TabItem>
          <TabItem active={tab === TAXONOMY_TYPE.Course} label="Courses">
            <TaxonomyList
              clientId={user?.client_id}
              type={TAXONOMY_TYPE.Course}
              title="Course Types"
            />
          </TabItem>
          <TabItem active={tab === TAXONOMY_TYPE.Location} label="Locations">
            <TaxonomyList
              clientId={user?.client_id}
              type={TAXONOMY_TYPE.Location}
              title="Location Types"
            />
          </TabItem>
          <TabItem active={tab === TAXONOMY_TYPE.Event} label="Events">
            <TaxonomyList
              clientId={user?.client_id}
              type={TAXONOMY_TYPE.Event}
              title="Event Types"
            />
          </TabItem>
        </Tabs>
      ) : (
        <Tabs key={tab}>
          <TabItem active={tab === TAXONOMY_TYPE.Client} label="Clients">
            <TaxonomyList
              clientId={user?.client_id}
              type={TAXONOMY_TYPE.Client}
              title="Client Types"
            />
          </TabItem>
        </Tabs>
      )}
    </>
  )
}

export default TaxonomyTabs
