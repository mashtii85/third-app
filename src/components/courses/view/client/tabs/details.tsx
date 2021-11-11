/**
 * Components - Courses - View - Client - Tabs - Details
 */

// React
import { useContext } from 'react'

// UI
import {
  OffCanvasContext,
  Row,
  Column,
  Details2,
  DetailsText,
  Heading,
  Space
} from '@drykiss/industry-ui'

// Hooks
import { useCourse } from '../../../hooks'
import { useTaxonomies } from '../../../../taxonomies/hooks'
import { useMedia } from '../../../../media/hooks/useMedia/useMedia'
import { useCurrentUser } from '../../../../../utils/useCurrentUser'

// Constants
import { ENTITIES } from '../../../../../constants/entities'

// Forms
import { MediaForm } from '../../../../media/forms/create/form'

// Helpers
import { Toolbar } from './helper'

// Types
import { Course } from '../../../../../types/course.d'
import { offCanvasType } from '../../../../../types/offCanvas.d'
import { MediaFilter, UseMediaProps } from '../../../../media/hooks/useMedia/types.d'
import { DropzoneProps, Medium, MEDIUM_CATEGORY, MEDIUM_TYPE } from '../../../../../types/medium.d'
import { STATUS_ACTIVE } from '../../../../../types/select.d'
import { MediaFormType } from '../../../../media/forms/create/types.d'
import { CoverImage } from '../../../../common/coverImage/coverImage'
import { CourseToolbarType } from './types.d'
import { CourseFilter } from '../../../hooks/types.d'

export const ClientDetails = ({ courseId }: { courseId: number }) => {
  const { course, loading, error } = useCourse(courseId)
  const { taxonomies } = useTaxonomies({
    id: course?.taxonomy_id
  })
  const { user } = useCurrentUser()

  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const filters: UseMediaProps = {
    entity: ENTITIES.Course,
    entityId: courseId,
    category: MEDIUM_CATEGORY.Cover,
    type: MEDIUM_TYPE.Image
  }
  const { mediaList } = useMedia(filters)
  const cover: Medium | undefined = mediaList?.find(
    (mdum) => mdum.filename && mdum.status === STATUS_ACTIVE.Active
  )

  const EditCover = () => {
    const defaultValues: Partial<MediaFormType> = {
      entity: ENTITIES.Course,
      entityId: courseId,
      category: MEDIUM_CATEGORY.Cover,
      status: STATUS_ACTIVE.Active,
      type: MEDIUM_TYPE.Image
    }
    const dropzoneProps: DropzoneProps = {
      accept: 'image/*',
      disabled: false,
      multiple: false
    }
    const filters: Partial<MediaFilter> = {
      entity: defaultValues.entity,
      entityId: defaultValues.entityId,
      category: defaultValues.category,
      type: defaultValues.type
    }

    offCanvas.show({
      title: 'Edit',
      submit: false,
      content: (
        <MediaForm
          filters={filters}
          dropzoneProps={dropzoneProps}
          defaultValues={defaultValues}
          onSuccess={offCanvas.close}
        />
      )
    })
  }

  let courseType = ''

  if (course?.taxonomy_id) {
    const [taxonomy] = taxonomies
    courseType = taxonomy?.name || ''
  }

  if (error) {
    console.error(error.message)
  }
  if (loading) {
    console.log('loading')
  }

  const courseFilter: Partial<CourseFilter> = { accountId: user.account_id }
  const courseToolbarProps: CourseToolbarType = {
    filters: courseFilter,
    defaultValues: course
  }

  return (
    <>
      <Row>
        <Column md="5">
          <Heading tag="h2" content={(course as Course)?.title} />
          <Space />
          <Details2
            open
            key={(course as Course)?.id}
            title="Details"
            toolbar={
              <Toolbar key={`toolbar-${course?.id}`} courseToolbarProps={courseToolbarProps} />
            }
          >
            <CoverImage
              src={
                cover?.filename ? `${process.env.NEXT_PUBLIC_S3_CDN_URL}/${cover?.filename}` : ''
              }
              action="Edit"
              click={EditCover}
              alt="Cover"
              title="Cover Photo"
            />
            <DetailsText content="Description" text={(course as Course)?.description ?? ''} />
            <DetailsText content="Course Type" text={courseType} />
          </Details2>
        </Column>
        <Column md="3.5"></Column>
      </Row>
    </>
  )
}
