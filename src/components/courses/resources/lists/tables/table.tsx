/**
 * Components - Courses - Resources - List - Table
 */
// UI
import { Details2 } from '@drykiss/industry-ui'

// Helpers
import { Toolbar } from './helpers'
import { ResourceTable } from './resourceTable'

// Hooks
import { usePost } from '../../../../posts/hooks/usePost/usePost'

// Types
import { PostFilter } from '../../../../posts/hooks/usePost/types.d'

export const ResourcesTable = (filters: Partial<PostFilter>) => {
  const { posts } = usePost(filters)

  return (
    <Details2
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
    </Details2>
  )
}
