/**
 * Components - Account - View - Details
 */

// Hooks
import { useAccount } from '../../hooks'

import { useTaxonomies } from '../../../taxonomies/hooks'
// UI
import { Details2, DetailsText, formatDateStandard } from '@drykiss/industry-ui'

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
    <Details2 open title={title}>
      <DetailsText content="Name" text={account?.name || ''} />
      <DetailsText content="Status" text={account?.status || ''} />
      <DetailsText content="Member Type" text={memberType} />
      <DetailsText content="Date Added" text={formatDateStandard(account?.created_at) || ''} />
    </Details2>
  )
}

export default AccountDetails
