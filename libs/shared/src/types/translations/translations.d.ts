export const defaultLocale = 'en' as const

export const locales = ['ar', 'en', 'es'] as const

export type Locale = typeof locales[number]

export interface Translations {
  [key: string]: string | Translations
}

export type Localization = {
  locale: Locale
  translations: Translations
}
export type useTranslationOutput = {
  t: (data: string) => string
  locale: Locale
}
