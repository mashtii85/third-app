// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid',
  'react-leaflet',
  '@react-leaflet/core'
])
const { i18n } = require('./next-i18next.config')
/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = withNx({
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false
  },
  i18n,
  eslint: {
    // Disable Next.js internal ESLint check due to differences with our config
    ignoreDuringBuilds: true
  },
  future: {
    webpack5: false
  }
})

module.exports = withTM(nextConfig)
