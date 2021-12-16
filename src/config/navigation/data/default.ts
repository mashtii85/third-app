/**
 * Navigation - Data - Default
 */

import useTranslation from '../../../translations/hooks/useTranslation'

// Types
import { LOCALE_NS } from '../../../types/locales.d'
import { Navigation } from '../../../types/navigation.d'

import pages from '../../pages'

export const Default = (): Partial<Navigation> => {
  const { t } = useTranslation(LOCALE_NS.Login)
  return {
    right: [
      {
        id: 'navHome',
        name: t('Home'),
        to: pages.home
      },
      {
        id: 'navSignIn',
        name: t('Login'),
        to: pages.account.signIn
      }
    ]
  }
}
