/**
 * Components - Account - View - Details
 */
// Hook
import { useAccount } from '../../hooks/useAccount'
// UI
import { Details2, DetailsText, formatDateStandard } from '@drykiss/industry-ui'
// types
import { AccountDetailsProps } from './type.d'

const AccountDetails = ({ accountId, title = '' }: AccountDetailsProps) => {
  const { account = {} } = useAccount({ accountId })

  return (
    <Details2 open summary={title}>
      <DetailsText content="Name" text={account.name || ''} />
      <DetailsText content="Email" text={account.email || ''} />
      <DetailsText content="Status" text={account.status || ''} />
      <DetailsText content="Structure" text={account.structure || ''} />
      <DetailsText content="Date Added" text={formatDateStandard(account.created_at) || ''} />
    </Details2>
  )
}

export default AccountDetails
