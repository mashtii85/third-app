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
import { Localization } from '../../../translations/types'

// Lodash
import isEmpty from 'lodash/isEmpty'
import merge from 'lodash/merge'

// UI
import { useAppTheme, useConfig } from '@drykiss/industry-ui'

import defaultLocale from '../../../translations/locales/en'

export const prepareI18n = (appSettings: AppSettings): AppSettings => {
  if (!appSettings) return appSettings
  const localization: Localization = {
    locale: 'en',
    translations: defaultLocale
  }

  const settings: AppSettings = { ...appSettings, localization }
  return settings
}

export const useAppSettings = (clientId: number): UseAppSettingsOutput => {
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
      setConfig({ ...merge(config, appSettings.config) })
    }

    if (!isEmpty(appSettings?.theme)) {
      setTheme({ ...merge(theme, appSettings.theme) })
    }
  }, [appSettings])

  const settings = prepareI18n(appSettings)

  return { appSettings: settings, error, getSettings, loading }
}
