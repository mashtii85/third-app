import { locales } from './config'

export type Locale = typeof locales[number]

export interface Translations {
  [key: string]: string | Translations
}

// export type Strings = {
//   [key in Locale]: Translations
// }

export type Localization = {
  locale: Locale
  translations: Translations
}
export type useTranslationOutput = {
  t: (data: string) => string
  locale: Locale
}
