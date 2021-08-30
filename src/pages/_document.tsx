/**
 * Document
 */

// Next
import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext
} from 'next/document'

// Style
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html className="no-js" lang="en" dir="ltr" prefix="og: http://ogp.me/ns#">
        <Head>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        </Head>
        <body
          style={{
            backgroundColor: 'rgb(245,248,250)',
            marginBottom: '140px'
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
