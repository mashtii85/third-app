/**
 * Components - Users - View - Details
 */

// React
import { MouseEvent, useContext } from 'react'

// Apollo
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER, UPDATE_USER } from './queries'

// UI
import {
  Button,
  ButtonToolbar,
  Column,
  Details2,
  DetailsText,
  formatDateStandard,
  OffCanvasContext,
  Row
} from '@drykiss/industry-ui'
import { ProfileHeader } from '../profileHeader/profileHeader'
import { UserForm } from './form'
import { UserAccountsTable } from './accounts/table'
import { offCanvasType } from '../../types/offCanvas'

// Types
import { User } from '../../types/user.d'
import { UserDetailsProps } from './types.d'

const UserDetails = ({ userId }: UserDetailsProps) => {
  const offCanvas: offCanvasType = useContext(OffCanvasContext)

  const { data: { user = {} } = {}, refetch } = useQuery(GET_USER, {
    variables: {
      userId: userId
    }
  })

  const [UpdateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      offCanvas.close()
      refetch()
    }
  })

  if (!user) {
    return <></>
  }
  const onSubmit = (form: User): void => {
    UpdateUser({
      variables: {
        userId: form.id,
        changes: form
      }
    })
  }

  const handleClick = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: <UserForm defaultValues={user} submit={onSubmit} />,
      title: 'Edit user'
    })
  }
  const Toolbar = () => {
    return (
      <ButtonToolbar>
        <Button context="secondary" onClick={handleClick}>
          Edit
        </Button>
      </ButtonToolbar>
    )
  }
  return (
    <Row>
      <Column md={6}>
        <ProfileHeader entity={{ name: `${user.name_first} ${user.name_last}` }} />
        <Details2 open title="Details" toolbar={<Toolbar />}>
          <DetailsText content="Name" text={`${user.name_first} ${user.name_last}`} />
          <DetailsText content="Email" text={user.email} />
          <DetailsText content="Phone" text={user?.custom_fields?.phone || '-'} />
          <DetailsText content="Status" text={user.status} />
          <DetailsText content="Date Added" text={formatDateStandard(user.created_at)} />
          <DetailsText content="Date Updated" text={formatDateStandard(user.updated_at)} />
        </Details2>
      </Column>
      <Column md={6}>
        <UserAccountsTable user={user} />
      </Column>
    </Row>
  )
}

export default UserDetails
