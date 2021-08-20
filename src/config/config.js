/**
 * Config
 */
const Canonical = require('./canonical')

export const version = '0.1.0'

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
  logo: '/logo.svg',
  name: 'RWA'
}

export { Canonical }

export const generalConfig = {
  isMobile: process.env.NEXT_PUBLIC_DEVICE === 'mobile',
  paginationSize: 10
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

export const Config = {
  apiConfig,
  Brand,
  generalConfig,
  Google,
  jwtConfig,
  version
}
