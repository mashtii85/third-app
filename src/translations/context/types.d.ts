/**
 * Translations - Context - Types.d
 */

import { Dispatch, SetStateAction } from 'react'
import { Locale, Localization } from '../types'

interface ContextProps {
  readonly localization: Localization
  setLocale: Dispatch<SetStateAction<Locale>>
}
