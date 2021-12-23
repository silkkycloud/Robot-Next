import React from "react"
import { useRouter } from "next/router"
import { useChannelApi } from "@/hooks/useApi"

import { NextSeo } from "next-seo"
import Image from "next/image"
import { VideoGrid } from "@/components/lib/Grid/Grid"
import Video from "@/components/Video/Video"
import LoadingVideos from "@/components/Loading/LoadingVideos"

import type { Channel } from "@/types/api"

export type ChannelVideosProps = {
  channel: Channel
}

export const ChannelVideos = ({ channel }: ChannelVideosProps): JSX.Element => (
  <VideoGrid>
    {channel.relatedStreams.map((video, i: number) => (
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
    ))}
  </VideoGrid>
)

const Channel = () => {
  const router = useRouter()
  const { channelId } = router.query

  const [channel, channelLoading] = useChannelApi(
    "/channel/",
    channelId,
    router.isReady
  )

  return (
    <>
      {channel.name ? <NextSeo title={`${channel.name} - Piped`} /> : null}
      <div>
        <div className="space-y-4">
          {/* Banner */}
          <div className="aspect-w-3 aspect-h-2">
            {channel.bannerUrl ? (
              <Image
                className="object-cover bg-gray-300 dark:bg-neutral-800"
                src={channel.bannerUrl}
                loading="lazy"
                alt={channel.name}
                width={2560}
                height={1440}
                layout="responsive"
              />
            ) : null}
          </div>
        </div>
        {/* Video grid */}
        {channelLoading ? (
          <LoadingVideos />
        ) : (
          <ChannelVideos channel={channel} />
        )}
      </div>
    </>
  )
}

export default Channel
