import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../state'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import '@fontsource/inter'

import Nav from '../components/Nav/Nav'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'

const App = ({ Component, pageProps }: AppProps) => {
  const snap = useSnapshot(state)

  return (
    <>
      <DefaultSeo
        title="Piped"
        description="An open-source alternative frontend for YouTube which is efficient by design."
        openGraph={{
          title: 'Piped',
          description: 'An open-source alternative frontend for YouTube which is efficient by design.',
        }}
      />
      <ThemeProvider
        attribute="class"
        forcedTheme={snap.theme}
      >
        <Nav>
          <Component {...pageProps} />
        </Nav>
      </ThemeProvider>
    </>
  )
}

export default App
