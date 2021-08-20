/**
 * Layout
 */

// React
import { node } from 'prop-types'

// Next
import Head from 'next/head'

// UI
import { Bootstrap } from '@drykiss/industry-ui'

// Components
import { AppProvider } from '../services/app'

// Config
import { Navigation } from '../config/navigation/navigation'

const Layout = ({ children }) => {
  return (
    <AppProvider>
      <Bootstrap fixed Navigation={Navigation}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
          <meta charSet="UTF-8" key="charset" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" key="edge" />
          <meta name="format-detection" content="telephone=no" key="format" />
        </Head>

        {children}

      </Bootstrap>
    </AppProvider>
  )
}

Layout.propTypes = {
  children: node.isRequired
}

export default Layout
