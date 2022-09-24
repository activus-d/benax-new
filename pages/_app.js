import '../styles/globals.css'
import { GlobalProvider } from '../components/globalContext'
import { AuthProvider } from '../lib/authContext'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return (
      <AuthProvider>
        <GlobalProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GlobalProvider>
      </AuthProvider>
  )
}

export default MyApp
