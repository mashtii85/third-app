/**
 * Components - Courses - View - Client
 */

// UI
import { Tabs } from '@drykiss/industry-ui'
import { Tab } from '../../../common/tab'
import { ClientDetails, ClientLessons, ClientUserEnrollments } from './tabs'
// Next
import { useRouter } from 'next/router'
import { CLIENT_TAB } from '../types.d'

export const ClientCourseView = () => {
  const { query } = useRouter()

  // todo: transfer this to courseTable route
  if (!query.tab) {
    query.tab = CLIENT_TAB.Details
  }
  const courseId: number = +(query?.id || '0')

  return (
    <>
      <Tabs>
        <Tab active={query.tab === CLIENT_TAB.Details || !query.tab} label={CLIENT_TAB.Details}>
          <ClientDetails courseId={courseId} />
        </Tab>
        <Tab active={query.tab === CLIENT_TAB.Lessons || !query.tab} label={CLIENT_TAB.Lessons}>
          <ClientLessons />
        </Tab>
        <Tab
          active={query.tab === CLIENT_TAB.Enrollments || !query.tab}
          label={CLIENT_TAB.Enrollments}
        >
          <ClientUserEnrollments courseId={courseId} />
        </Tab>
      </Tabs>
    </>
  )
}
