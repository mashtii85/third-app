/**
 * Components - Dashboard - View
 */

// React
import { useContext } from 'react'

// UI
import { Details2, UserContext } from '@drykiss/industry-ui'
import { CourseList } from '../courses/list/list'
import { DashboardOverview } from './tiles/overview'

import { Courses } from '../../mocks/courses'
import { ACCOUNT_TYPE } from '../../types/user.d'

export const DashboardView = () => {
  const { user } = useContext(UserContext)

  const courses = [...Courses]
  const filteredCourses = courses.filter((item) => item.progress !== 100)

  const renderSwitch = (type: ACCOUNT_TYPE) => {
    switch (type) {
      case ACCOUNT_TYPE.Admin:
        return <DashboardOverview user={user} />
      case ACCOUNT_TYPE.User:
        return (
          <Details2 open title="Courses in progress">
            <CourseList courses={filteredCourses} />
          </Details2>
        )

      default:
        break
    }
  }
  return <>{renderSwitch(user.account_type)}</>
}
