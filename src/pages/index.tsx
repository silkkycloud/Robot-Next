import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import Nav from '@/components/Nav/Nav'

import state from '../state'

import Home from '@/components/Home/Home'
import Trending from '@/components/Trending/Trending'
import Settings from '@/components/Settings/Settings'
import Feed from '@/components/Feed/Feed'
import Subscriptions from '@/components/Subscriptions/Subscriptions'
import Channel from '@/components/Channel/Channel'

const Index = () => {
  const snap = useSnapshot(state)

  return (
    <Router>
      <Head>
        <title>Piped</title>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/__ENV.js" />
      </Head>
      <DefaultSeo
        title="Piped"
        description="An open-source alternative frontend for YouTube which is efficient by design."
        openGraph={{
          type: 'website',
          url: process.env.NEXT_PUBLIC_BASE_URL,
          title: 'Piped',
          description:
            'An open-source alternative frontend for YouTube which is efficient by design.',
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/icons/favicon-32x32.png`,
              width: 32,
              height: 32,
              type: 'image/png',
            },
          ],
        }}
      />
      <ThemeProvider attribute="class" forcedTheme={snap.theme}>
        <Nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/c/:id/*" element={<Channel channelPrefix="/c/" />} />
            <Route
              path="/channel/:id/*"
              element={<Channel channelPrefix="/channel/" />}
            />
            <Route
              path="/user/:id/*"
              element={<Channel channelPrefix="/user/" />}
            />
          </Routes>
        </Nav>
      </ThemeProvider>
    </Router>
  )
}

export default Index
