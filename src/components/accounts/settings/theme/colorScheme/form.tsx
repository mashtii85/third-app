/**
 * Components - Accounts - Settings - Theme - Form
 *
 * Allows a client to set theme colors. This is saved in the account meta.
 */

// React Hook Form
import { useForm } from 'react-hook-form'

// Color Picker
import { HexColorPicker } from 'react-colorful'
import { colord } from 'colord'

// UI
import {
  Column,
  Details2,
  Form,
  FormField,
  Heading,
  Row,
  Space,
  useAppTheme,
  useConfig
} from '@drykiss/industry-ui'
import { fields, StyledColour, StyledField } from './helpers'
import { useUpdateAccount } from '../../../../accounts/hooks'

// Types
import { Account } from '../../../../../types/account'

export const ColorSchemeForm = ({
  account,
  handleSuccess
}: {
  account: Account | undefined
  handleSuccess: () => void
}) => {
  const { config, setConfig } = useConfig()
  const { theme, setTheme } = useAppTheme()

  const { updateAccount } = useUpdateAccount({
    onCompleted: () => { },
    onError: (error) => {
      console.error(error.message)
    }
  })

  const defaults: any = {}

  fields.forEach((f) => {
    defaults[f.value] = {}
    f.items.forEach((i) => {
      defaults[f.value][i.value] = colord(theme[f.value][i.value]).toHex()
    })
  })

  const { control, errors, setValue, handleSubmit, register, watch } = useForm({
    defaultValues: { ...defaults }
  })

  const onSubmit = async (form: any) => {
    const meta = { ...account?.meta } || {}
    meta.theme = {
      ...form
    }

    setTheme({ ...form })

    // Workaround - need to figure out why setTheme doesn't work unless config is updated as well
    // Probably need to force a re-render
    setConfig({ ...config })

    // Update a
    await updateAccount({
      variables: {
        accountId: account?.id,
        accountSet: {
          meta
        },
        hasUser: false
      }
    })

    handleSuccess()
  }

  const defaultOptions = {
    control: control,
    errors: errors,
    register: register
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      {fields.map((f) => {
        return (
          <div>
            <Heading tag="h3" content={f.title} />
            <div>
              {f.items.map((i) => {
                const fieldName = f.value + '.' + i.value
                const color = colord(watch(fieldName)).toHex()
                const title = (
                  <StyledField>
                    <StyledColour color={color} /> {i.title}
                  </StyledField>
                )
                return (
                  <Details2 context="white" title={title}>
                    <Row>
                      <Column md={3}>
                        <FormField {...defaultOptions} name={fieldName} />
                      </Column>
                    </Row>
                    <Space />
                    <HexColorPicker color={color} onChange={(c) => setValue(fieldName, c)} />
                  </Details2>
                )
              })}
            </div>
            <Space />
          </div>
        )
      })}
    </Form>
  )
}
