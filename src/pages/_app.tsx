import React from 'react'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import '@fontsource/inter'

import Nav from '../components/Nav/Nav'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'

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
    <ThemeProvider attribute="class">
      <Nav>
          <Component {...pageProps} />
      </Nav>
    </ThemeProvider>
  </>
)

export default App
