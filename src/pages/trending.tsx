import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../state'
import useFetchApi from '../hooks/useFetchApi'

import { NextSeo } from 'next-seo'

const Trending = () => {
  const snap = useSnapshot(state)

  const trending = useFetchApi('/trending?region=US')

  return (
    <>
      <NextSeo title="Trending - Piped" />
    </>
  )
}

export default Trending
