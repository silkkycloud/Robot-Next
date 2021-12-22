import React from 'react'
import { useRouter } from 'next/router'
import { useChannelApi } from '@/hooks/useApi'

import { VideoGrid } from '@/components/lib/Grid/Grid'
import Video from '@/components/Video/Video'
import LoadingVideos from '@/components/Loading/LoadingVideos'
import { NextSeo } from 'next-seo'

import type { Channel } from '@/types/api'

export type ChannelVideosProps = {
  channel: Channel
}

export const ChannelVideos = ({channel}: ChannelVideosProps): JSX.Element => (
  <VideoGrid>
    {channel.relatedStreams != undefined ? channel.relatedStreams.map((video, i: number) => (
      <li key={i.toString()}>
        <Video
          url={video.url}
          title={video.title}
          thumbnail={video.thumbnail}
          uploaderName={video.uploaderName}
          uploaderUrl={video.uploaderUrl}
          uploaderAvatar={channel.avatarUrl}
          uploadedDate={video.uploadedDate}
          duration={video.duration}
          views={video.views}
          uploaderVerified={video.uploaderVerified}
        />
      </li>
    )) : null}
  </VideoGrid>
)

const Channel = () => {
  const router = useRouter()
  const { channelId } = router.query

  const [channel, channelLoading] = useChannelApi(channelId, router.isReady)

  return (
    <>
      <NextSeo title={`${channel.name} - Piped`} />
      {channelLoading ? (
        <LoadingVideos />
      ) : (
        <ChannelVideos channel={channel} />
      )}
    </>
  )
}

export default Channel
