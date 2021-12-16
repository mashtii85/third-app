import { useContext } from 'react'
import { I18nContext } from '../context/i18nContext'
import { useTranslationOutput } from '../types'
import { LooseObject } from '../../types/object'
import { LOCALE_NS } from '../../types/locales.d'

export default function useTranslation(namespace?: LOCALE_NS): useTranslationOutput {
  const { localization } = useContext(I18nContext)

  function t(key: string): string {
    const keys: string[] = key.split(':')
    // this section works with combination of ns and key
    // t('home:AllCourses')
    if (keys.length > 1) {
      const object = localization.translations as LooseObject
      const translation = object[keys[0]][keys[1]] as string

      return translation
    }

    // this section works with ns injected as constructor to useTransaction and key from t function
    // useTransaction('home')
    // t('AllCourses')
    if (namespace) {
      const object = localization.translations as LooseObject
      const translation = object[namespace][key] as string

      return translation
    }

    if (!localization.translations[key]) {
      console.warn(`Translation '${key}' for locale '${localization.locale}' not found.`)
    }

    const translation = (localization.translations[key] || '') as string

    return translation
  }
  return {
    t,
    locale: localization.locale
  }
}
