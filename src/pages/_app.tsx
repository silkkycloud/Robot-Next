import React from 'react'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import '@fontsource/inter'

const PipedApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
    </div>
  )
}

export default PipedApp
