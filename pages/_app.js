import '../styles/globals.css'
import { AppProvider } from '../components/context'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
    
  )
}

export default MyApp
