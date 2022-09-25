import '../styles/globals.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { GlobalProvider } from '../components/globalContext'
import { AuthProvider } from '../lib/authContext'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {

  const contextClass = {
    success: "bg-deepBlue text-veryLightGrey w-72",
    error: "bg-red-600",
    info: "bg-red-500 w-72",
    warning: "bg-orange-400 w-72",
    default: "bg-deepBlue w-72 text-center mx-auto",
    dark: "bg-white-600 font-gray-300 w-72",
  };

  return (
      <AuthProvider>
        <GlobalProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer
            toastClassName={({ type }) => contextClass[type || "default"] + 
              " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
            }
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            closeOnClick
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
          />
        </GlobalProvider>
      </AuthProvider>
  )
}

export default MyApp
