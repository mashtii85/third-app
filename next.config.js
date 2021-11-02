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

module.exports = withTM({
  eslint: {
    // Disable Next.js internal ESLint check due to differences with our config
    ignoreDuringBuilds: true
  },
  future: {
    webpack5: false
  }
})
