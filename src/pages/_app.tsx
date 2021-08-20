/**
 * App
 */

// Fontawesome
import '../config/icons'

// UI
import { MyApp } from '@drykiss/industry-ui'

// Layout
import Layout from '../layouts/index'

// Config
import { AccessPages } from '../config/access/pages'
import { AccessRules } from '../config/access/rules'
import { Config } from '../config/config'
import { Theme } from '../config/theme'

// Leaflet
import 'leaflet/dist/leaflet.css'

import 'draft-js/dist/Draft.css'
import '@draft-js-plugins/emoji/lib/plugin.css'
import '@draft-js-plugins/hashtag/lib/plugin.css'
import 'draft-js-mention-plugin/lib/plugin.css'

import '@fullcalendar/common/main.min.css'
import '@fullcalendar/daygrid/main.min.css'
import '@fullcalendar/list/main.min.css'
import '@fullcalendar/timegrid/main.min.css'

import 'react-datepicker/dist/react-datepicker.css'
import 'tippy.js/dist/tippy.css'

const PageApp = (props: any) => {
  return (
    <MyApp
      config={{ ...Config, AccessPages, AccessRules }}
      Layout={Layout}
      offCanvas
      theme={Theme}
      {...props}
    />
  )
}

export default PageApp
