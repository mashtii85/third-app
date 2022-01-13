/**
 * Account - Sign In
 */

// Next
import type { NextPage } from 'next'

// UI
import { Column, Label, Login, Page, Row, Select } from '@drykiss/industry-ui'

import { useForm } from 'react-hook-form'
import { locales, LOCALE_NS } from '../../src/types/locales'
import { useEffect } from 'react'

// Next
import { useRouter } from 'next/router'
import useTranslation from '../../src/translations/hooks/useTranslation'

const PageSignIn: NextPage = () => {
  const {
    formState: { errors = {} },
    register,
    watch
  } = useForm<any>({
    defaultValues: {}
  })

  const defaultOptions = {
    errors,
    register
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
          <Label label={t('Language')}>
            <Select {...defaultOptions} name={'locale'} options={locales} />
          </Label>

          <Login blockSubmitButton forgotPassword={false} pathSignUp="" showPassword />
        </Column>
      </Row>
    </Page>
  )
}

export default PageSignIn
