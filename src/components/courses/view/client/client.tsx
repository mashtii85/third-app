/**
 * Components - Courses - View - Client
 */

// UI
import { Tabs } from '@drykiss/industry-ui'
import { Tab } from '../../../common/tab'
import { ClientDetails, EnrolledCourses, ClientResources } from './tabs'

// Next
import { useRouter } from 'next/router'
import { CLIENT_TAB } from '../types.d'
import { ClientCourseModule } from './tabs/curriculum/courseModules'

export const ClientCourseView = () => {
  const { query } = useRouter()

  // todo: transfer this to courseTable route
  const tab = (): string => {
    switch (query?.tab?.toString().toLowerCase()) {
      case CLIENT_TAB.Curriculum.toLowerCase():
        return CLIENT_TAB.Curriculum
      case CLIENT_TAB.Enrollments.toLowerCase():
        return CLIENT_TAB.Enrollments
      case CLIENT_TAB.Resources.toLowerCase():
        return CLIENT_TAB.Resources
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
          <ClientCourseModule courseId={courseId} />
        </Tab>
        <Tab active={tab() === CLIENT_TAB.Enrollments} label={CLIENT_TAB.Enrollments}>
          <EnrolledCourses courseId={courseId} />
        </Tab>
        <Tab active={tab() === CLIENT_TAB.Resources} label={CLIENT_TAB.Resources}>
          <ClientResources courseId={courseId} />
        </Tab>
      </Tabs>
    </>
  )
}
