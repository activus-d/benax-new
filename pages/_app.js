import {
   useQuery,
   useMutation,
   useQueryClient,
   QueryClient,
   QueryClientProvider,
 } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import '../styles/globals.css'
import { GlobalProvider } from '../components/globalContext'
import { AuthProvider } from '../lib/authContext'
import Layout from '../components/layout'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </GlobalProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
