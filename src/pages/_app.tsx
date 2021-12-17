import React from 'react'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import '@fontsource/inter'

import Nav from '../components/Nav/Nav'
import { DefaultSeo } from 'next-seo'

export const fetchJson = async () => {

}

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <DefaultSeo
      title="Piped"
      description="An open-source alternative frontend for YouTube which is efficient by design."
      openGraph={{
        title: 'Piped',
        description: 'An open-source alternative frontend for YouTube which is efficient by design.',
      }}
    />

    <Nav>
      <Component {...pageProps} />
    </Nav>
  </>
)

export default App
