import React from 'react'
import { useRouter } from 'next/router'

import Channel from '@/components/Channel/Channel'

const ChannelRoute = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query

  return <Channel channelId={id} channelPathPrefix="/channel/" />
}

export default ChannelRoute
