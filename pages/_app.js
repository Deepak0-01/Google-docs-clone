import 'tailwindcss/tailwind.css'
import "@material-tailwind/react/tailwind.css";
import "draft-js/dist/Draft.css";

import { Provider } from 'next-auth/client'
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <>

    <Provider session={pageProps.session}>
   
    <Component {...pageProps} />
    </Provider>
    </>
  )
}

export default MyApp
