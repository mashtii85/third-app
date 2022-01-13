/**
 * Components - Courses - View - Client - Tabs - Resources
 */

// UI
import { Row, Column } from '@drykiss/industry-ui'

// Hooks
import { useCurrentUser } from '../../../../../../utils/useCurrentUser'

// Forms
import { ResourcesTable } from '../../../../resources/lists/tables/table'

// Types
import { POST_TYPE } from '../../../../../../types/post.d'
import { ENTITIES } from '../../../../../../constants/entities'

export const ClientResources = ({ courseId }: { courseId: number }) => {
  const { user } = useCurrentUser()

  return (
    <Row>
      <Column md="5">
        <ResourcesTable
          key="resources-table"
          accountId={user.account_id}
          entity={ENTITIES.Course}
          entityId={courseId}
          type={POST_TYPE.Resource}
        />
      </Column>
      <Column md="7"></Column>
    </Row>
  )
}
