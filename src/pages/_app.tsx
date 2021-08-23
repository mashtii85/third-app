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
