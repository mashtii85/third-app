/**
 * Translations - Config
 */

import { Locale } from './types'

export const defaultLocale = 'en' as const

export const locales = ['ar', 'en', 'es'] as const

export const languageNames = {
  ar: 'Arabic',
  en: 'English',
  es: 'Spanish'
}

export function isLocale(tested?: string): tested is Locale {
  return locales.some((locale) => locale === tested)
}
