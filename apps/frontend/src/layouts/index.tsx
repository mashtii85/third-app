/**
 * Layout
 */

// Next
import Head from 'next/head'

// UI
import { Bootstrap } from '@drykiss/industry-ui'

// Components
import { useCurrentUser } from '../utils/useCurrentUser'
import { AppProvider } from '../services/app'

// Config
import { Navigation } from '../config/navigation/navigation'
import GlobalStyle from '../styles/global-styles'
interface LayoutProps {
  children: JSX.Element | JSX.Element[]
}

const Layout = ({ children }: LayoutProps) => {
  const { user } = useCurrentUser()

  // Prepare unique key to automatically re-render the app when user account changes
  const key = `${user?.account_id || 0}-${user?.id || 0}`

  return (
    <AppProvider key={key} user={user}>
      <Bootstrap fixed Navigation={Navigation}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
          <meta charSet="UTF-8" key="charset" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" key="edge" />
          <meta name="format-detection" content="telephone=no" key="format" />
        </Head>

        {children}
      </Bootstrap>
      <GlobalStyle />
    </AppProvider>
  )
}

export default Layout
