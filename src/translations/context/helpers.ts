import locales from '../locales'

// Types
import { Localization, Locale } from '../types'

export const getLocalizationProps = (language?: string): Localization => {
  const inputLocale = (language as Locale) ?? 'en'
  const lang = inputLocale

  const translations = { ...locales[lang] }

  return {
    locale: inputLocale,
    translations
  }
}
