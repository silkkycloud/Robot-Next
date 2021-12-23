import React from 'react'
import { useFetchChannel } from '@/hooks/api'

import { NextSeo } from 'next-seo'
import { VideoGrid } from '@/components/ui/Grid/Grid'
import Video from '@/components/Video/Video'

export interface ChannelProps {
  channelPathPrefix: string
  channelId: string | string[] | undefined
}

const LoadingChannel = () => <h1>Nothing... Yet</h1>

const Channel = (props: ChannelProps): JSX.Element => {
  const [channel, channelLoading] = useFetchChannel(
    props.channelPathPrefix,
    props.channelId
  )

  return (
    <>
      {channelLoading ? (
        <LoadingChannel />
      ) : (
        <>
          <div className="block py-6 md:pb-6 md:py-0">
            <NextSeo title={`${channel.name} - Piped`} />
            <div>
              {/* Banner */}
              <div className="hidden md:block">
                {channel.bannerUrl && channel.name && (
                  // TODO: Can't get next/image component to work with these styles
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="w-full bg-gray-300 dark:bg-neutral-800"
                    src={channel.bannerUrl}
                    loading="lazy"
                    alt={channel.name}
                  />
                )}
              </div>
              {/* Video grid */}
              {channel.relatedStreams && (
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
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Channel
