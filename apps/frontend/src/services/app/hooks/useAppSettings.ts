/**
 * Services - App - Hooks - UseAppSettings
 */

// React
import { useEffect } from 'react'

// GQL
import { useLazyQuery } from '@apollo/client'
import { APP_SETTINGS } from '../queries'

// Types
import { UseAppSettingsOutput } from './types'
import { AppSettings } from '../types'
import { locales, Locale, Localization } from '@availabletowork/types'

// Lodash
import isEmpty from 'lodash/isEmpty'
import merge from 'lodash/merge'

// UI
import { useAppTheme, useConfig } from '@drykiss/industry-ui'

import localeTranslations from '../../../translations/locales'
// import { I18nContext } from '../../../translations/context'

// this process should happen in BE, it's just a test
export const prepareServerI18n = (appSettings: AppSettings): Localization => {
  if (!appSettings) return { translations: {}, locale: 'en' }
  const localization: Localization = {
    locale: 'en',
    translations: {
      profile: {
        DateAdded: 'Date Added',
        DateUpdated: 'Date Updated'
      }
    }
  }

  return localization
}

export const useAppSettings = (clientId: number, locale: Locale): UseAppSettingsOutput => {
  // const { setLocale } = useContext(I18nContext)
  const { config, setConfig } = useConfig()
  const { theme, setTheme } = useAppTheme()
  const [getSettings, { data: { appSettings } = { appSettings: null }, loading, error }] =
    useLazyQuery(APP_SETTINGS, {
      variables: {
        client_id: clientId ?? 0
      }
    })

  // Fetch app settings when logged in user changes
  useEffect(() => {
    getSettings()
  }, [clientId])

  // Update theme and config when settings change
  useEffect(() => {
    if (!isEmpty(appSettings?.config)) {
      const serverLocales = prepareServerI18n(appSettings)
      // merge server side locales with local
      const theLocales = merge(localeTranslations, {
        [locale]: { ...localeTranslations[locale], ...serverLocales.translations }
      })

      // this should be removed as soon as we find out a solution
      // user.meta?.locale && setLocale(user.meta?.locale)

      const theConfig = merge(
        config,
        { Translations: theLocales, locales: locales },
        appSettings.config
      )

      setConfig(theConfig)
    }

    if (!isEmpty(appSettings?.theme)) {
      setTheme(merge(theme, appSettings.theme))
    }
    // appSettings && setLocale(locale)
  }, [appSettings])

  return { appSettings, error, getSettings, loading }
}
