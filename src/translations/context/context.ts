/**
 * Translations - Context - Context
 */

// React
import { createContext } from 'react'

// Types
import { ContextProps } from './types.d'

export const I18nContext = createContext<ContextProps>({
  localization: {
    locale: 'en', // default lang
    translations: {}
  },
  setLocale: () => null
})
