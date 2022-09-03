import '../styles/globals.css'
import { AppProvider } from '../components/context'
import LandingPage from '../components/landingPage'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <LandingPage>
        <Component {...pageProps} />
      </LandingPage>
    </AppProvider>
    
  )
}

export default MyApp
