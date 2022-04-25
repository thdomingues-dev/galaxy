// Packages
import type { AppProps } from 'next/app'

// Components
import { PageHeader } from '../components'

// Styles
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <PageHeader />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
