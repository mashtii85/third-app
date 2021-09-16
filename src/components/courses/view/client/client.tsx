/**
 * Components - Courses - View - Client
 */

// UI
import { Tabs } from '@drykiss/industry-ui'
import { Tab } from '../../../common/tab'
import { ClientDetails, ClientLessons, EnrolledCourses } from './tabs'
// Next
import { useRouter } from 'next/router'
import { CLIENT_TAB } from '../types.d'

export const ClientCourseView = () => {
  const { query } = useRouter()

  // todo: transfer this to courseTable route
  const tabName: string = (query?.tab as string) ?? CLIENT_TAB.Details

  const courseId: number = +(query?.id || '0')
  return (
    <>
      <Tabs>
        <Tab active={tabName === CLIENT_TAB.Details || !tabName} label={CLIENT_TAB.Details}>
          <ClientDetails courseId={courseId} />
        </Tab>
        <Tab active={tabName === CLIENT_TAB.Lessons || !tabName} label={CLIENT_TAB.Lessons}>
          <ClientLessons />
        </Tab>
        <Tab active={tabName === CLIENT_TAB.Enrollments || !tabName} label={CLIENT_TAB.Enrollments}>
          <EnrolledCourses courseId={courseId} />
        </Tab>
      </Tabs>
    </>
  )
}
