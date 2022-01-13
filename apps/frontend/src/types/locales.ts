/**
 * Types - Locales
 */

import { Options } from './options'

export enum LOCALE_NS {
  Home = 'home',
  Common = 'common',
  Navbar = 'navbar',
  Login = 'login',
  Profile = 'profile'
}

export const locales: Options[] = [
  {
    label: 'English',
    value: 'en'
  },

  {
    label: 'Arabic',
    value: 'ar'
  },
  {
    label: 'Spanish',
    value: 'es'
  }
]
