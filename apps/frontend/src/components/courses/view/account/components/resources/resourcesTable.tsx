/**
 * Components - Courses - Resources - List - Table - ResourceTable
 */

// Hooks
import { usePost } from '../../../../../posts/hooks/usePost/usePost'

// UI
import { Divider } from '@drykiss/industry-ui'
import { ResourceRow } from '../../../../resources/lists/tables/resourceTable'

// Constants
import { ENTITIES } from '../../../../../../constants/entities'

// Types
import { PostFilter } from '../../../../../posts/hooks/usePost/types.d'
import { POST_TYPE } from '../../../../../../types/post.d'

export const ResourcesTable = ({ courseId }: { courseId: number }) => {
  const filters: Partial<PostFilter> = {
    // accountId,
    entity: ENTITIES.Course,
    entityId: courseId,
    type: POST_TYPE.Resource
  }
  const { posts } = usePost(filters)
  return (
    <>
      {posts?.length ? (
        <>
          {posts?.map((post) => {
            return (
              <>
                <ResourceRow key={`resource-row-${post.id}`} post={post} clientView={false} />
                <Divider />
              </>
            )
          })}
        </>
      ) : (
        'No Content'
      )}
    </>
  )
}
