/**
 * Translations - Context - I18nContext
 */

// React
import { useEffect, useState } from 'react'

// Next
import { useRouter } from 'next/router'

// Types
import { Locale, Localization } from '../types'
import { getLocalizationProps } from './helpers'

// UI
import { useConfig } from '@drykiss/industry-ui'
import { I18nContext } from './context'
import { isLocale } from '../config'

export const I18nProvider = ({ children, locale }: { children: JSX.Element; locale: Locale }) => {
  const router = useRouter()
  const { config } = useConfig()

  const localization: Localization = {
    locale,
    translations: {}
  }
  const theLocale = isLocale(locale) ? locale : 'en'
  const [localeState, setLocaleState] = useState<Locale>(theLocale)
  const [localizationState, setLocalization] = useState<Localization>(localization)

  useEffect(() => {
    theLocale && router.push(router.pathname, router.pathname, { locale: localeState })
  }, [localeState, setLocaleState])

  useEffect(() => {
    const locale = isLocale(router.locale) ? router.locale : 'en'
    const localizationProps = getLocalizationProps(locale, config.Translations)

    setLocalization(localizationProps)
  }, [router.locale])

  return (
    <I18nContext.Provider value={{ localization: localizationState, setLocale: setLocaleState }}>
      {children}
    </I18nContext.Provider>
  )
}
