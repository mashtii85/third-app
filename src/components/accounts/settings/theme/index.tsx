/**
 * Components - Accounts - Settings - Theme
 */

// React
import { useContext } from 'react'

// UI
import {
  Button,
  Column,
  Details2,
  Heading,
  OffCanvasContext,
  Row,
  Space,
  useAppTheme
} from '@drykiss/industry-ui'

import { ThemeSettingsForm } from './form'
import { fields, StyledColour, StyledField } from './helpers'

// Types
import { Account } from '../../../../types/account'
import { offCanvasType } from '../../../../types/offCanvas'

interface ThemeSettingsProps {
  account: Account
}

export const ThemeSettings = ({ account }: ThemeSettingsProps) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const { theme } = useAppTheme()

  const handleSuccess = () => {
    offCanvas.close()
  }

  const handleThemeSettings = (e) => {
    e.stopPropagation()

    offCanvas.show({
      content: <ThemeSettingsForm account={account} handleSuccess={handleSuccess} />,
      title: 'Theme Settings'
    })
  }

  const Toolbar = () => (
    <Button content="Edit" context="white" onClick={handleThemeSettings} size="sm" />
  )

  return (
    <Row>
      <Column md={6}>
        <Details2 fitParentHeight open title="Theme Settings" toolbar={<Toolbar />}>
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
      </Column>
    </Row>
  )
}
