/**
 * Next Config
 */

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid',
  'react-leaflet',
  '@react-leaflet/core'
])
const { i18n } = require('./next-i18next.config')

module.exports = withTM({
  i18n,
  eslint: {
    // Disable Next.js internal ESLint check due to differences with our config
    ignoreDuringBuilds: true
  },
  future: {
    webpack5: false
  }
})
