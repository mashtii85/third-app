/**
 * Components - Courses - View - Client - Tabs - Curriculum
 */

// Apollo
import { useQuery } from '@apollo/client'

import { GET_COURSE } from '../../../queries'

// Next
import { useRouter } from 'next/router'

// Types
import { CourseData } from '../../../hooks/types'
import { Course } from '../../../../../types/course'

// Partial views
import { LessonsListTable } from '../../../../lessons/lists/lessonsListTable'

export const ClientLessons = () => {
  const { query } = useRouter()

  const { data: { course } = { course: {} } } = useQuery<CourseData>(GET_COURSE, {
    skip: !query?.id,
    variables: {
      courseId: parseInt(query?.id as string)
    }
  })

  return <LessonsListTable course={course as Course} />
}
