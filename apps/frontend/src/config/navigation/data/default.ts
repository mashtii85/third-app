/**
 * Navigation - Data - Default
 */

// I18n
import useTranslation from '../../../translations/hooks/useTranslation'

// Types
import { LOCALE_NS, Navigation, pages } from '@availabletowork/types'

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
