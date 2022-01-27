/**
 * Components - Accounts - Settings - Theme
 */

// UI
import { Column, Row, Space } from '@drykiss/industry-ui'

import { ColorScheme } from './colorScheme'
import { Brand } from './brand'
import { ThemeLogo } from './logo'

// Types
import { Account } from '@availabletowork/types'

export const ThemeSettings = ({ account }: { account: Account | undefined }) => {
  return (
    <Row>
      <Column md={6}>
        <ColorScheme account={account} />
      </Column>
      <Column md={6}>
        <>
          <Brand account={account} />
          <Space />
          <ThemeLogo account={account} />
        </>
      </Column>
    </Row>
  )
}
