import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { Link } from 'react-router-dom'
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
import Search from '@/components/Search/Search'

export const NotFound = () => (
  <div className="bg-white dark:bg-neutral-900 min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div className="max-w-max mx-auto">
      <main className="sm:flex">
        <h1 className="text-4xl font-extrabold text-red-600 sm:text-5xl">
          404
        </h1>
        <div className="sm:ml-6">
          <div className="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1 className="text-4xl font-extrabold text-black dark:text-white tracking-tight sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-1 text-base text-gray-600 dark:text-neutral-400">
              Please check the URL in the address bar and try again.
            </p>
          </div>
          <div className="mt-10 sm:border-l sm:border-transparent sm:pl-6">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  </div>
)

export const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const Index = () => {
  const snap = useSnapshot(state)

  return (
    <Router>
      <ScrollToTop />
      <DefaultSeo
        title="Piped"
        description="An open-source alternative frontend for YouTube which is efficient by design."
        openGraph={{
          type: 'website',
          url: 'https://piped.silkky.cloud',
          title: 'Piped',
          description:
            'An open-source alternative frontend for YouTube which is efficient by design.',
          images: [
            {
              url: 'https://piped.silkky.cloud/images/icons/favicon-32x32.png',
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
            <Route path="/search" element={<Search />} />
            <Route path="/c/:id/*" element={<Channel channelPrefix="/c/" />} />
            <Route
              path="/channel/:id/*"
              element={<Channel channelPrefix="/channel/" />}
            />
            <Route
              path="/user/:id/*"
              element={<Channel channelPrefix="/user/" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Nav>
      </ThemeProvider>
    </Router>
  )
}

export default Index
