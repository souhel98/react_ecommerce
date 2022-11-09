import toast, { Toaster } from 'react-hot-toast';

import { Layout } from '../components'
import '../styles/globals.css'

import { StateContext } from '../context/StateContext'


function MyApp({ Component, pageProps }) {
  // const notify = () => toast('Here is your toast.');
  return (
    <StateContext>
        
      <Layout>
      {/* <button onClick={notify}>Make me a toast</button> */}
          <Toaster/>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
