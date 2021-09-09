/**
 * Config
 */

import { AWS } from './aws'

export const version = '0.1.0'

export const Canonical = 'https://lms.realworldacademies.com'

export const apiConfig = {
  authURL: process.env.NEXT_PUBLIC_AUTH_URL,
  timeout: 0,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'X-APP': process.env.NEXT_PUBLIC_DEVICE === 'mobile' ? 'mobile' : 'web',
    'X-APP-VERSION': version
  }
}

export const Brand = {
  logo: '/logo.png',
  name: 'RWA'
}

export const generalConfig = {
  isMobile: process.env.NEXT_PUBLIC_DEVICE === 'mobile',
  paginationSize: 20
}

export const GetAddress = {
  apiKey: 'u2XL3dsICky3N6z74iWwkw17498'
}

export const Google = {
  analytics: '',
  map: 'AIzaSyBUzxbbHVhHG57UyGYrTG47eIQ8qF-yiuM',
  geocoding: 'AIzaSyAemr12bOOt2SLS_RiBh8o1UZhDTkE_SIU'
}

export const jwtConfig = {
  type: 'RS512',
  key: process.env.NEXT_PUBLIC_JWT_PUBLIC_KEY
}

// Internationalisation
export const defaultLocale = 'en'
export const locales = ['en']
export const languageNames = {
  en: 'English'
}

export const Translations = {
  en: {}
}

export const Config = {
  apiConfig,
  AWS,
  Brand,
  generalConfig,
  Google,
  jwtConfig,
  languageNames,
  locales,
  Translations,
  version
}
