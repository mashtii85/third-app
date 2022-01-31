/**
 * Components - AccountUsers - Hooks - UseUserAccounts - UseUserAccounts
 */

// React
import { useContext, useEffect } from 'react'

// Apollo
import { useQuery } from '@apollo/client'
import { GET_USER } from '@availabletowork/queries'

// Localization
import { isLocale } from '../../../../translations/config'
import { I18nContext } from '../../../../translations/context'

// Types
import { User, UserDatum, UserVariables, UseUserOutput } from '@availabletowork/types'

export const useUser = (userId: number): UseUserOutput => {
  const { setLocale } = useContext(I18nContext)

  const { data, error, loading } = useQuery<UserDatum, UserVariables>(GET_USER, {
    variables: { userId }
  })

  const user: Partial<User> = data?.user ?? {}
  useEffect(() => {
    const locale = isLocale(user.meta?.locale) && user.meta?.locale ? user.meta.locale : 'en'
    setLocale(locale)
  }, [user.meta?.locale])

  return { error, loading, user }
}
