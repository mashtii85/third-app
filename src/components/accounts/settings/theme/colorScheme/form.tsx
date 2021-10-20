/**
 * Components - Accounts - Settings - Theme - Form
 *
 * Allows a client to set theme colors. This is saved in the account meta.
 */

// React Hook Form
import { useForm } from 'react-hook-form'

// UI
import { Form, FormField, Heading, Space, useAppTheme, useConfig } from '@drykiss/industry-ui'
import { colours, fields, StyledColour, StyledDropdown, StyledField } from './helpers'
import { useUpdateAccount } from '../../../../accounts/hooks'

// Types
import { Account } from '../../../../../types/account'

export const ThemeSettingsForm = ({
  account,
  handleSuccess
}: {
  account: Account
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

  const defaults = {}

  fields.forEach((f) => {
    defaults[f.value] = {}
    f.items.forEach((i) => {
      defaults[f.value][i.value] = theme[f.value][i.value]
    })
  })

  const { control, errors, setValue, handleSubmit, register, watch } = useForm({
    defaultValues: { ...defaults }
  })

  const onSubmit = async (form) => {
    const meta = { ...account.meta } || {}
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
        accountId: account.id,
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
                return (
                  <StyledField>
                    <FormField {...defaultOptions} name={fieldName} type="hidden" />
                    <StyledColour color={watch(fieldName)} />
                    <StyledDropdown
                      elementType="colour"
                      items={colours}
                      onChange={(e) => {
                        setValue(fieldName, e.colour)
                      }}
                    >
                      Select {i.title}
                    </StyledDropdown>
                  </StyledField>
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
