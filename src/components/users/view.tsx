/**
 * Components - Users - View - Details
 */

// React
import { useContext } from 'react'

// Apollo
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER, UPDATE_USER } from './queries'

// Next
import { useRouter } from 'next/router'

// UI
import {
  Column,
  Details,
  DetailsText,
  formatDateStandard,
  OffCanvasContext,
  Row
} from '@drykiss/industry-ui'
import { ProfileHeader } from '../profileHeader/profileHeader'
import { UserForm } from './form'
import { UserAccountsTable } from '../modules/accountUsers/table'
import { User } from '../../types/user.d'
import { offCanvasType } from '../../types/offCanvas'

const UserDetails = () => {
  const { query } = useRouter()

  const offCanvas: offCanvasType = useContext(OffCanvasContext)

  const { data: { user = {} } = {}, refetch } = useQuery(GET_USER, {
    variables: {
      userId: parseInt(query?.id as string)
    }
  })

  const [UpdateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      offCanvas.close()
      refetch()
    }
  })
  if (!query?.id) {
    return <></>
  }

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

  const handleClick = (): void => {
    offCanvas.show({
      content: <UserForm defaultValues={user} submit={onSubmit} />,
      title: 'Edit user'
    })
  }

  return (
    <Row>
      <Column md={6}>
        <ProfileHeader entity={{ name: `${user.name_first} ${user.name_last}` }} />
        <Details button={'Edit'} handleClick={handleClick} open summary="Details">
          <DetailsText content="Name" text={`${user.name_first} ${user.name_last}`} />
          <DetailsText content="Email" text={user.email || ''} />
          <DetailsText content="Phone" text={user?.custom_fields?.phone || ''} />
          <DetailsText content="Status" text={user.status || ''} />
          <DetailsText content="Date Added" text={formatDateStandard(user.created_at)} />
          <DetailsText content="Date Updated" text={formatDateStandard(user.updated_at)} />
        </Details>
      </Column>
      <Column md={6}>
        <UserAccountsTable user={user} />
      </Column>
    </Row>
  )
}

export default UserDetails
