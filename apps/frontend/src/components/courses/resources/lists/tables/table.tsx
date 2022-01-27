/**
 * Components - Courses - Resources - List - Table
 */
// UI
import { Details } from '@drykiss/industry-ui'

// Helpers
import { Toolbar } from './helpers'
import { ResourceTable } from './resourceTable'

// Hooks
import { usePost } from '../../../../posts/hooks/usePost/usePost'

// Types
import { PostFilter } from '@availabletowork/types'

export const ResourcesTable = (filters: Partial<PostFilter>) => {
  const { posts } = usePost(filters)

  return (
    <Details
      open
      title="Resources"
      toolbar={
        <Toolbar
          accountId={filters.accountId}
          entity={filters.entity}
          entityId={filters.entityId}
          type={filters.type}
        />
      }
    >
      <ResourceTable posts={posts} />
    </Details>
  )
}
