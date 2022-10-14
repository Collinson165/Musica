import '../styles/globals.css'
import  AppContextProvider  from './components/context'
import Layout from './components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </AppContextProvider>

  )
}

export default MyApp
