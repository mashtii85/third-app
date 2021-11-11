/**
 * Components - ProfileHeader
 */

// React
import { useContext } from 'react'

// Styles
import styled from 'styled-components'

// UI
import {
  OffCanvasContext,
  Avatar,
  Column,
  Container,
  Heading,
  Icon,
  Row
} from '@drykiss/industry-ui'
import { MediaForm } from '../media/forms/create/form'

// Types
import { HeaderProps } from './types.d'
import { offCanvasType } from '../../types/offCanvas'
import { MEDIUM_CATEGORY, MEDIUM_TYPE, DropzoneProps, Medium } from '../../types/medium.d'
import { STATUS_ACTIVE } from '../../types/select.d'
import { MediaFormType } from '../media/forms/create/types.d'
import { UseMediaProps, MediaFilter } from '../media/hooks/useMedia/types.d'

// Constants
import { THEME_CONTEXT } from '../../constants/themeContext'

// Hooks
import { useCurrentUser } from '../../utils/useCurrentUser'
import { useMedia } from '../media/hooks/useMedia/useMedia'
import { ENTITIES } from '../../constants/entities'

const HeadingContent = ({ entity }: HeaderProps) => {
  return (
    <>
      <StyledIcon context={THEME_CONTEXT.primary} icon="building" />
      {entity.name}
    </>
  )
}

export const ProfileHeader = ({ entity }: HeaderProps) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const { user } = useCurrentUser()
  const filters: UseMediaProps = {
    entity: ENTITIES.User,
    entityId: user.id,
    category: MEDIUM_CATEGORY.Avatar,
    type: MEDIUM_TYPE.Image
  }
  const { mediaList } = useMedia(filters)
  const avatar: Medium | undefined = mediaList?.find(
    (mdum) => mdum.filename && mdum.status === STATUS_ACTIVE.Active
  )

  const EditAvatar = () => {
    const defaultValues: Partial<MediaFormType> = {
      entity: ENTITIES.User,
      entityId: user.id,
      category: MEDIUM_CATEGORY.Avatar,
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

  return (
    <StyledHeader>
      <Container>
        <Row>
          <Column md={3}>
            {avatar?.filename ? (
              <Avatar
                src={`${process.env.NEXT_PUBLIC_S3_CDN_URL}/${avatar?.filename}`}
                context={THEME_CONTEXT.primary}
                action="Edit"
                withAction="true"
                click={EditAvatar}
              />
            ) : (
              <Avatar
                content={entity.name}
                context={THEME_CONTEXT.primary}
                action="Edit"
                withAction="true"
                click={EditAvatar}
              />
            )}
          </Column>
          <Column md={9}>
            <StyledHeading content={<HeadingContent entity={entity} />} noMargin />
          </Column>
        </Row>
      </Container>
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  box-shadow: rgba(45, 62, 80, 0.12) 0 1px 5px 0;
  margin-bottom: 0.5rem;
  padding: 1rem 0;
`

const StyledHeading = styled(Heading)`
  font-size: 1rem;
  margin-top: 0.5rem;
`

const StyledIcon = styled(Icon)`
  margin-right: 0.5rem;
`
