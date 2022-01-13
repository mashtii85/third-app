/**
 * Components - AccountUsers - Hooks - UseUserAccounts - UseUserAccounts
 */

// Apollo
import { useQuery } from '@apollo/client'
import { useContext, useEffect } from 'react'
import { isLocale } from '../../../../translations/config'
import { I18nContext } from '../../../../translations/context'
import { User } from '../../../../types/user'
import { GET_USER } from '../../queries'
// Types
import { UserData, UserVariables, UseUserOutput } from './types.d'

export const useUser = (userId: number): UseUserOutput => {
  const { setLocale } = useContext(I18nContext)

  const { data, error, loading } = useQuery<UserData, UserVariables>(GET_USER, {
    variables: { userId }
  })

  const user: Partial<User> = data?.user ?? {}
  useEffect(() => {
    const locale = isLocale(user.meta?.locale) && user.meta?.locale ? user.meta.locale : 'en'
    setLocale(locale)
  }, [user.meta?.locale])

  return { error, loading, user }
}
