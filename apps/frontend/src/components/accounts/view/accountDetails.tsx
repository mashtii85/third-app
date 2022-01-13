/**
 * Components - Account - View - Details
 */

// UI
import { Details, DetailsText, formatDateStandard } from '@drykiss/industry-ui'

// Hooks
import { useAccount } from '../hooks'
import { useTaxonomies } from '../../taxonomies/hooks'

// Types
import { AccountDetailsProps } from './type.d'

const AccountDetails = ({ accountId, title = '' }: AccountDetailsProps) => {
  const { account } = useAccount({ accountId })

  const { taxonomies } = useTaxonomies({
    id: account?.taxonomy_id
  })

  let memberType = ''

  if (account?.taxonomy_id) {
    const [taxonomy] = taxonomies
    memberType = taxonomy?.name || ''
  }

  return (
    <Details open title={title}>
      <DetailsText content="Name" text={account?.name || ''} />
      <DetailsText content="Status" text={account?.status || ''} />
      <DetailsText content="Member Type" text={memberType} />
      <DetailsText content="Date Added" text={formatDateStandard(account?.created_at) || ''} />
    </Details>
  )
}

export default AccountDetails
