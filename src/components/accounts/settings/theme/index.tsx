/**
 * Components - Accounts - Settings - Theme
 */

// UI
import { Column, Row } from '@drykiss/industry-ui'

import { ColorScheme } from './colorScheme'
import { ThemeLogo } from './logo'

// Types
import { Account } from '../../../../types/account'

export const ThemeSettings = ({ account }: { account: Account }) => {
  return (
    <Row>
      <Column md={6}>
        <ColorScheme account={account} />
      </Column>
      <Column md={6}>
        <ThemeLogo account={account} />
      </Column>
    </Row>
  )
}
