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
  const tab = (): string => {
    switch (query?.tab?.toString().toLowerCase()) {
      case CLIENT_TAB.Curriculum.toLowerCase():
        return CLIENT_TAB.Curriculum
      case CLIENT_TAB.Enrollments.toLowerCase():
        return CLIENT_TAB.Enrollments
      case CLIENT_TAB.Details.toLowerCase():
      default:
        return CLIENT_TAB.Details
    }
  }
  const courseId: number = +(query?.id || '0')
  return (
    <>
      <Tabs key={tab()}>
        <Tab active={tab() === CLIENT_TAB.Details} label={CLIENT_TAB.Details}>
          <ClientDetails courseId={courseId} />
        </Tab>
        <Tab active={tab() === CLIENT_TAB.Curriculum} label={CLIENT_TAB.Curriculum}>
          <ClientLessons courseId={courseId} />
        </Tab>
        <Tab active={tab() === CLIENT_TAB.Enrollments} label={CLIENT_TAB.Enrollments}>
          <EnrolledCourses courseId={courseId} />
        </Tab>
      </Tabs>
    </>
  )
}
