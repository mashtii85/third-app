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

const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([withTM])
