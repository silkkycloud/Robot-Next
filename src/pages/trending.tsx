import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../state'

import { NextSeo } from 'next-seo'

const Trending = () => {

  const snap = useSnapshot(state)

  return (
    <>
      <NextSeo title="Trending - Piped" />
    </>
  )
}

export default Trending
