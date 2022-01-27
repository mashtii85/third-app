/**
 * Translations - Context - Helpers
 */

// Types
import { Localization, Locale, Translations } from '@availabletowork/types'

export const getLocalizationProps = (
  language: Locale,
  locales: Record<Locale, Translations>
): Localization => {
  const inputLocale = (language as Locale) ?? 'en'
  const lang = inputLocale

  const translations = { ...locales[lang] }

  return {
    locale: inputLocale,
    translations
  }
}
