/**
 * Components - Accounts - Settings - Theme - Form
 *
 * Allows an admin to set theme colors. This is saved in the account meta.
 */

// React
import { func, number, object } from 'prop-types'

// React Hook Form
import { useForm } from 'react-hook-form'

// Apollo
// import { useMutation } from '@apollo/client'

// Utils
import merge from 'deepmerge'

// UI
import { Form, FormField, Heading, Space } from '@drykiss/industry-ui'

import { useConfig } from '../../../../services/config'
import { colours, fields, StyledColour, StyledDropdown, StyledField } from './helpers'

export const ThemeSettingsForm = ({ account, accountId, handleSuccess }) => {
  const { theme, setTheme } = useConfig()

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
    meta.themeSettings = {
      ...form
    }

    setTheme(merge(theme, form))

    // ToDo: Save updated meta

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

ThemeSettingsForm.propTypes = {
  account: object.isRequired,
  accountId: number.isRequired,
  handleSuccess: func.isRequired
}
