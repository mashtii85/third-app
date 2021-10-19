/**
 * App
 */

// Apollo
import { useApollo } from '../services/apolloClient'
import { ApolloProvider } from '@apollo/client'

// FontAwesome
import '../config/icons'

// UI
import {
  AppThemeProvider,
  AppLayout,
  AuthorizationProvider,
  ConfigProvider,
  OffCanvasProvider,
  UserProvider,
  ThemeStyle
} from '@drykiss/industry-ui'

// Layout
import Layout from '../layouts/index'

// Config
import { AccessPages } from '../config/access/pages'
import { AccessRules } from '../config/access/rules'
import { Config } from '../config/config'
import { Theme } from '../config/theme'
import type { AppProps } from 'next/app'

// CSS
import 'react-datepicker/dist/react-datepicker.css'
import 'tippy.js/dist/tippy.css'

const MyApp = (props: AppProps) => {
  const apolloClient = useApollo(props.pageProps, Config)

  return (
    <AppThemeProvider theme={Theme}>
      <ConfigProvider config={{ ...Config, AccessPages, AccessRules }}>
        <ThemeStyle />
        <ApolloProvider client={apolloClient}>
          <UserProvider>
            <AuthorizationProvider>
              <OffCanvasProvider>
                <AppLayout
                  Component={props.Component}
                  Layout={Layout}
                  pageProps={props.pageProps}
                />
              </OffCanvasProvider>
            </AuthorizationProvider>
          </UserProvider>
        </ApolloProvider>
      </ConfigProvider>
    </AppThemeProvider>
  )
}

export default MyApp
