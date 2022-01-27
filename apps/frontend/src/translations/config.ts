/**
 * Translations - Config
 */

import { Locale, locales } from '@availabletowork/types'

export const languageNames = {
  ar: 'Arabic',
  en: 'English',
  es: 'Spanish'
}

export function isLocale(tested?: string): tested is Locale {
  return locales.some((locale) => locale === tested)
}
