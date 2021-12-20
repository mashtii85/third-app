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
    text: 'English',
    value: 'en'
  },

  {
    text: 'Arabic',
    value: 'ar'
  },
  {
    text: 'Spanish',
    value: 'es'
  }
]
