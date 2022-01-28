/**
 * Components - Courses - Resources - List - Table - ResourceTable
 */

// React
import { useContext } from 'react'

// UI
import {
  Divider,
  Row,
  Column,
  Link,
  formatDateStandard,
  formatTime,
  Button,
  ButtonToolbar,
  OffCanvasContext
} from '@drykiss/industry-ui'
import { CustomRow, Title, DateSpan, Content, RightAlign, BlackSpan, MaroonSpan } from './customDOM'
import { ResourcesDeleteForm } from '../../forms/delete/form'
import { ResourcesForm } from '../../forms/upsert/form'

// Helpers
import { fileinfo } from '../../forms/attachment/helpers'
import { getIconByFilename, Icon } from './helpers'

// Constants
import { RESOURCE_TYPE, SIZE, THEME_CONTEXT } from '@availabletowork/constants'

// Types & Constants
import { offCanvasType, Post, PostDeleteType, ResourcesFormType } from '@availabletowork/types'

export const ResourceTable = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      {posts?.length ? (
        <>
          {posts?.map((post) => {
            return (
              <>
                <ResourceRow key={`row-${post.id}`} post={post} clientView={true} />
                <Divider />
              </>
            )
          })}
        </>
      ) : (
        'No content'
      )}
    </>
  )
}

export const ResourceRow = ({ post, clientView }: { post: Post; clientView: boolean }) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleDelete = () => {
    const resourcesDeleteProps: PostDeleteType = {
      id: post.id,
      accountId: post.account_id,
      entity: post.entity,
      entityId: post.entity_id,
      title: post.title,
      type: post.type
    }
    offCanvas.show({
      content: (
        <ResourcesDeleteForm
          resourcesDeleteProps={resourcesDeleteProps}
          onSuccess={offCanvas.close}
        />
      ),
      title: 'Delete resource',
      submit: false
    })
  }

  const handleEdit = () => {
    const defaultValues: Partial<ResourcesFormType> = {
      id: post.id,
      type: post.type,
      title: post.title,
      content: post.content,
      customFields: post?.custom_fields,
      medium: post?.media ? post?.media[0] : undefined
    }
    offCanvas.show({
      content: <ResourcesForm onSuccess={offCanvas.close} defaultValues={defaultValues} />,
      submit: true,
      title: 'Edit resource'
    })
  }

  let date = `${formatDateStandard(post.updated_at)}`
  if (clientView) date += ` ${formatTime(post.updated_at)}`
  const hasAttachment = !!post?.custom_fields?.resource_type
  let icon = ''
  let info = ''
  if (post?.custom_fields?.resource_type) {
    switch (post?.custom_fields?.resource_type) {
      case RESOURCE_TYPE.Link:
        icon = 'link'
        info = post?.custom_fields?.link ?? 'nolink'
        break
      case RESOURCE_TYPE.File:
        if (post?.custom_fields?.filename) {
          icon = getIconByFilename(post?.custom_fields?.filename)
          info = fileinfo(post?.custom_fields?.filename, post?.custom_fields?.filesize ?? 0)
        } else {
          icon = 'nofile'
        }
        break
    }
  } else {
    icon = 'no attachment icon'
    info = 'No attachment'
  }

  return (
    <>
      <CustomRow key={`custom-row-${post.id}`}>
        <Row key={`row-${post.id}`}>
          <Column key={`icon-column-${post.id}`} md={2}>
            <Icon key={`icon-${post.id}`} iconname={icon} />
          </Column>
          <Column key={`content-column-${post.id}`} md={clientView ? 9 : 10}>
            <Row>
              <Column key={`title-column-${post.id}`} md={8}>
                <Title>{post.title}</Title>
              </Column>
              <Column key={`date-column-${post.id}`} md={4}>
                <DateSpan>{date}</DateSpan>
              </Column>
            </Row>
            <Row key={`info-row-${post.id}`}>
              <Column key={`info-column-${post.id}`} md={12}>
                {info}
              </Column>
            </Row>
            <Row key={`content-row-${post.id}`}>
              <Column md={12}>
                <Content key={`content-${post.id}`} height={clientView ? 66 : 36}>
                  {!post.content || post.content === '' ? 'No content' : post.content}
                </Content>
              </Column>
            </Row>
            {hasAttachment && (
              <Row key={`attachment-row-${post.id}`}>
                <Column md={12}>
                  <RightAlign>
                    {post.custom_fields?.resource_type === RESOURCE_TYPE.Link && (
                      <MaroonSpan>
                        <Link
                          key={`link-${post.id}`}
                          to={post.custom_fields.link}
                          target="_blank"
                          passHref
                        >
                          View
                        </Link>
                      </MaroonSpan>
                    )}
                    {post.custom_fields?.resource_type === RESOURCE_TYPE.File &&
                      post.media &&
                      post.media[0] && (
                        <>
                          <MaroonSpan>
                            <Link
                              key={`view-link-${post.id}`}
                              to={`${process.env.NEXT_PUBLIC_S3_CDN_URL}/${post.media[0].filename}`}
                            >
                              View
                            </Link>
                          </MaroonSpan>
                          &nbsp;&nbsp;|&nbsp;&nbsp;
                          <BlackSpan>
                            <Link
                              key={`download-link-${post.id}`}
                              to={`${process.env.NEXT_PUBLIC_S3_CDN_URL}/${post.media[0].filename}`}
                              target="_blank"
                            >
                              Download
                            </Link>
                          </BlackSpan>
                        </>
                      )}
                  </RightAlign>
                </Column>
              </Row>
            )}
          </Column>
          {clientView && (
            <Column key={`button-column-${post.id}`} md={1}>
              <Row>
                <ButtonToolbar>
                  <Button
                    key={`edit-button-${post.id}`}
                    context={THEME_CONTEXT.secondary}
                    size={SIZE.SM}
                    startIcon="edit"
                    onClick={handleEdit}
                  />
                </ButtonToolbar>
              </Row>
              <Row>
                <ButtonToolbar>
                  <Button
                    key={`delete-button-${post.id}`}
                    context={THEME_CONTEXT.warning}
                    size={SIZE.SM}
                    startIcon="trash"
                    onClick={handleDelete}
                  />
                </ButtonToolbar>
              </Row>
            </Column>
          )}
        </Row>
      </CustomRow>
    </>
  )
}
