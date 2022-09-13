import '../styles/globals.css'
import { GlobalProvider } from '../components/globalContext'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalProvider>
  )
}

export default MyApp
