import React from 'react'
import { useRouter } from 'next/router'
import { useChannelApi } from '../../hooks/useApi'

const Channel = () => {
  const router = useRouter()
  const { channelId } = router.query

  const [channel] = useChannelApi(channelId)

  return (
    <div>
      {channel.relatedStreams.map((video, index) => (
        <li key={index.toString()}>
          {video.title}
        </li>
      ))}
    </div>
  )
}

export default Channel
