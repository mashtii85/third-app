// React
import { createContext, FC, useEffect, useState } from 'react'

// Next
import { useRouter } from 'next/router'

import defaultStrings from '../locales/en'

// hooks
import { useCurrentUser } from '../../utils/useCurrentUser'
import { useUser } from '../../components/users/hooks'
// Types
import { ContextProps } from './types.d'
import { Localization } from '../types'
import { getLocalizationProps } from './helpers'
import { LooseObject } from '../../types/object'
// import { useApp } from '../../utils/useApp'

export const I18nContext = createContext<ContextProps>({
  localization: {
    locale: 'en', // default lang
    translations: defaultStrings
  }
})

export const I18nProvider: FC = ({ children }) => {
  const currentUser = useCurrentUser()
  const { user } = useUser(currentUser?.user?.id)
  const router = useRouter()
  // const app = useApp()

  const localization: Localization = {
    locale: 'en',
    translations: defaultStrings
  }

  const [localizationState, setLocalization] = useState<Localization>(localization)

  useEffect(() => {
    const locale = user?.meta?.locale

    locale && router.push(router.pathname, router.pathname, { locale })
  }, [user.meta?.locale])

  useEffect(() => {
    const localizationProps = Object.assign({}, getLocalizationProps(router.locale))
    // merge default locale in case of fallback word/s
    const loc = Object.assign({}, localizationProps)
    Object.entries(localizationProps.translations).forEach(([namespace]) => {
      loc.translations[namespace] = {
        // @ts-ignore
        ...defaultStrings[namespace],
        ...(localizationProps.translations[namespace] as LooseObject)
        // this section will be added after getting locale from api
        // ...app.localization
      }
    })

    setLocalization(loc)
  }, [router.locale])

  return (
    <I18nContext.Provider value={{ localization: localizationState }}>
      {children}
    </I18nContext.Provider>
  )
}
