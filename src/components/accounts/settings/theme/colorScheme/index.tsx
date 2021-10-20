/**
 * Components - Accounts - Settings - Theme - Color Scheme
 */

// React
import { MouseEvent } from 'react'

// UI
import { Button, Details2, Heading, Space, useAppTheme, useOffCanvas } from '@drykiss/industry-ui'

import { ThemeSettingsForm } from './form'
import { fields, StyledColour, StyledField } from './helpers'

// Types
import { Account } from '../../../../../types/account'

export const ColorScheme = ({ account }: { account: Account }) => {
  const offCanvas = useOffCanvas()
  const { theme } = useAppTheme()

  const handleSuccess = () => {
    offCanvas.close()
  }

  const handleThemeSettings = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    offCanvas.show({
      content: <ThemeSettingsForm account={account} handleSuccess={handleSuccess} />,
      title: 'Theme Settings'
    })
  }

  const ColorSchemeToolbar = () => (
    <Button content="Edit" context="white" onClick={handleThemeSettings} size="sm" />
  )

  return (
    <Details2 fitParentHeight open title="Color Scheme" toolbar={<ColorSchemeToolbar />}>
      {fields.map((f) => {
        return (
          <div key={f.value}>
            <Heading tag="h3" content={f.title} />
            <div>
              {f.items.map((i) => {
                return (
                  <StyledField key={i.value}>
                    <StyledColour color={theme[f.value][i.value]} /> {i.title}
                  </StyledField>
                )
              })}
            </div>
            <Space />
          </div>
        )
      })}
    </Details2>
  )
}
