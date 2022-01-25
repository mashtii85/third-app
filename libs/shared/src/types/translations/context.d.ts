/**
 * Translations - Context - Types.d
 */

import { Dispatch, SetStateAction } from 'react'
import { Locale, Localization } from './translations'

interface ContextProps {
  readonly localization: Localization
  setLocale: Dispatch<SetStateAction<Locale>>
}
