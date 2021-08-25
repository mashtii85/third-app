/**
 * Components - Courses - View
 */

// Next
import { useRouter } from 'next/router'

// UI
import { Column, Details2, DetailsText, Heading, Image, Row, Progress, ProgressBar, Space, Stepper } from '@drykiss/industry-ui'

// Types
import { Module } from '../../types/module'

// Mocks
import { Courses } from '../../mocks/courses'

export const CourseView = () => {
  const { query } = useRouter()

  if (!query?.id) {
    return null
  }

  const course = Courses.find(c => c.id === parseInt(query.id as any))

  if (!course) {
    return null
  }

  const prepareLessons = (m: Module) => {
    const data: any = []

    m?.lessons?.length && m.lessons.forEach(lesson => {
      data.push({
        id: lesson.id,
        label: lesson.title,
        date: lesson.id === 1 ? '23 Aug 2021 11:45' : null
      })
    })

    return data
  }

  return (
    <Row>
      <Column md={4}>
        <Heading tag='h2' content={course.title} />

        <Space />
        {course.modules?.length && course.modules.map(m => (
          <Details2 key={m.id} open title={m.title}>
            <Stepper items={prepareLessons(m)} />
          </Details2>
        ))}
      </Column>

      <Column md={8}>
        <Heading tag='h2' content="Course overview" />

        <Space />

        <Row>
          <Column md={8}>
            <Details2 open title='Details'>
              {course.media?.length && <Image alt={course.title} src={course.media[0]?.filename} />}
              <DetailsText content="Author" text={course.author} />
              <DetailsText content="Description" text={course.description} />
            </Details2>
          </Column>

          <Column md={4}>
            <Details2 open title='Progress'>
              <Progress size="lg">
                <ProgressBar animated context="primary" now={12} striped>
                  {`${course?.progress || 0}%`}
                </ProgressBar>
              </Progress>
            </Details2>
          </Column>
        </Row>

      </Column>
    </Row>
  )
}

export default CourseView