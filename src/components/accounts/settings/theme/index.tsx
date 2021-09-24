/**
 * Components - Accounts - Settings - Theme
 */

// React
import { useContext } from 'react'

// UI
import { Button, Details2, Heading, OffCanvasContext, Space } from '@drykiss/industry-ui'

import { useApp } from '../../../../utils/useApp'
import { fields, StyledColour, StyledField } from './helpers'

export const ThemeSettings = ({ accountId }) => {
  const offCanvas = useContext(OffCanvasContext)
  const app = useApp()
  const theme = { x: {} }

  console.log(accountId, app)

  const handleThemeSettings = (e) => {
    e.stopPropagation()

    offCanvas.show({
      content: <div>aaa</div>,
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
                    {/* <StyledColour color={theme[f.value][i.value]} /> {i.title} */}
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
