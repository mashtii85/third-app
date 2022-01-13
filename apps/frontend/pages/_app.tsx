/**
 * App
 */

// Apollo
import { useApollo } from '../src/services/apolloClient'

import { ApolloProvider } from '@apollo/client'

// FontAwesome
import '../src/config/icons'

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
import Layout from '../src/layouts'

// Config
import { Config } from '../src/config/config'

import { Theme } from '../src/config/theme'
import type { AppProps } from 'next/app'

// CSS
import 'react-datepicker/dist/react-datepicker.css'
import 'tippy.js/dist/tippy.css'
import '@fullcalendar/common/main.min.css'
import '@fullcalendar/daygrid/main.min.css'
import '@fullcalendar/list/main.min.css'
import '@fullcalendar/timegrid/main.min.css'
import { I18nProvider } from '../src/translations/context'

const MyApp = (props: AppProps) => {
  const apolloClient = useApollo(props.pageProps, Config)

  return (
    <AppThemeProvider theme={Theme}>
      <ConfigProvider config={{ ...Config }}>
        <ThemeStyle />
        <ApolloProvider client={apolloClient}>
          <UserProvider>
            <AuthorizationProvider>
              <OffCanvasProvider>
                <I18nProvider locale="en">
                  <AppLayout
                    Component={props.Component}
                    Layout={Layout}
                    pageProps={props.pageProps}
                  />
                </I18nProvider>
              </OffCanvasProvider>
            </AuthorizationProvider>
          </UserProvider>
        </ApolloProvider>
      </ConfigProvider>
    </AppThemeProvider>
  )
}

export default MyApp
