/**
 * App
 */

// Apollo
import { useApollo } from '../services/apolloClient'

// FontAwesome
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
import type { AppProps } from 'next/app'

const PageApp = (props: AppProps) => {
  const apolloClient = useApollo(props.pageProps, Config)

  return (
    <MyApp
      apolloClient={apolloClient}
      config={{ ...Config, AccessPages, AccessRules }}
      Layout={Layout}
      offCanvas
      pageProgressBar
      theme={Theme}
      user
      {...props}
    />
  )
}

export default PageApp
