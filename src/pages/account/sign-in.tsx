/**
 * Account - Sign In
 */

// Next
import type { NextPage } from 'next'

// UI
import { Column, FormLabel, Login, Page, Row, SelectField } from '@drykiss/industry-ui'

import { useForm } from 'react-hook-form'
import { locales, LOCALE_NS } from '../../types/locales.d'
import { useEffect } from 'react'

// Next
import { useRouter } from 'next/router'
import useTranslation from '../../translations/hooks/useTranslation'

const PageSignIn: NextPage = () => {
  const { errors, register, watch } = useForm({
    defaultValues: {}
  })

  const defaultOptions = {
    errors: errors,
    register: register
  }

  const { t } = useTranslation(LOCALE_NS.Login)

  const router = useRouter()

  const locale: string = watch('locale')
  useEffect(() => {
    if (locale && router.locale !== locale) {
      router.push(router.pathname, router.pathname, { locale })
    }
  }, [locale])

  return (
    <Page>
      <Row>
        <Column md={6} offset={{ md: 3 }}>
          <FormLabel label={t('Language')}>
            <SelectField {...defaultOptions} name={'locale'} options={locales} />
          </FormLabel>

          <Login blockSubmitButton forgotPassword={false} pathSignUp="" showPassword />
        </Column>
      </Row>
    </Page>
  )
}

export default PageSignIn
