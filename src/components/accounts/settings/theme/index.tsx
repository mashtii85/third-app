/**
 * Components - Accounts - Settings - Theme
 */

// React
import { useContext } from 'react'

// UI
import {
  Button,
  Details2,
  Heading,
  OffCanvasContext,
  Space,
  useAppTheme
} from '@drykiss/industry-ui'

import { useApp } from '../../../../utils/useApp'
import { ThemeSettingsForm } from './form'
import { fields, StyledColour, StyledField } from './helpers'

// Types
import { offCanvasType } from '../../../../types/offCanvas'

export const ThemeSettings = ({ accountId }) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const { theme } = useAppTheme()
  const app = useApp()

  console.log(accountId, app)

  const handleSuccess = (items) => {
    console.log('items', items)
    offCanvas.close()
  }

  const handleThemeSettings = (e) => {
    e.stopPropagation()

    offCanvas.show({
      content: (
        <ThemeSettingsForm account={{}} accountId={accountId} handleSuccess={handleSuccess} />
      ),
      title: 'Theme Settings'
    })
  }

  const Toolbar = () => (
    <Button content="Edit" context="secondary" onClick={handleThemeSettings} size="sm" />
  )

  return (
    <Details2 fitParentHeight open title="Theme Settings" toolbar={<Toolbar />}>
      {fields.map((f) => {
        return (
          <div>
            <Heading tag="h3" content={f.title} />
            <div>
              {f.items.map((i) => {
                return (
                  <StyledField>
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
