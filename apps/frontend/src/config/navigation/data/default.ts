/**
 * Navigation - Data - Default
 */

// I18n
import useTranslation from '../../../translations/hooks/useTranslation'

// Constants
import { LOCALE_NS, pages } from '@availabletowork/constants'

// Types
import { Navigation } from '@availabletowork/types'

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
