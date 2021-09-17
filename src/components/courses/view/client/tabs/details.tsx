/**
 * Components - Courses - View - Client - Tabs - Details
 */

// UI
import { Row, Column, Details2, DetailsText, Heading, Image, Space } from '@drykiss/industry-ui'

// Types
import { Course } from '../../../../../types/course'

import { useCourse } from '../../../hooks'

export const ClientDetails = ({ courseId }: { courseId: number }) => {
  const { course, loading, error } = useCourse(courseId)
  if (error) {
    console.error(error.message)
  }
  if (loading) {
    console.log('loading')
  }
  return (
    <>
      <Row>
        <Column md="5">
          <Heading tag="h2" content={(course as Course)?.title} />
          <Space />
          <Details2 open key={(course as Course)?.id} title="Details">
            {(course as Course)?.media?.length && (
              <Image
                alt={(course as Course)?.title}
                src={`/${((course as Course)?.media ?? [])[0].filename}`}
              />
            )}
            <DetailsText content="Description" text={(course as Course)?.description ?? ''} />
          </Details2>
        </Column>
        <Column md="3.5"></Column>
      </Row>
    </>
  )
}
