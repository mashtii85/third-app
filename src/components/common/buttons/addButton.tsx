/**
 * Components - Common - Buttons - AddButton
 */

// UI
import { Button, ButtonToolbar, Divider } from '@drykiss/industry-ui'
import { SIZE } from '../../../config/theme'
import { LooseObject } from '../../../types/object'

export const AddButton = ({
  children,
  content = 'add',
  context = 'secondary',
  data,
  disabled,
  handleClick,
  size = SIZE.SM,
  type = 'button'
}: {
  children?: JSX.Element | JSX.Element[]
  content?: string
  context?: string
  data?: LooseObject
  disabled?: boolean
  handleClick: (data?: any) => void
  size?: SIZE
  type?: string
}) => (
  <>
    <Divider size={SIZE.SM} />

    <ButtonToolbar align="flex-end">
      {children}
      <Button
        content={content}
        context={context}
        disabled={disabled}
        onClick={handleClick}
        size={size}
        type={type}
        {...data}
      />
    </ButtonToolbar>
  </>
)
