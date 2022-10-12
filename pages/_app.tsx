import '../styles/globals.css'
import { AppWrapper } from './components/context'
import Layout from './components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </AppWrapper>

  )
}

export default MyApp
