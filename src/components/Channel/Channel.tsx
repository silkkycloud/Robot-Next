import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchChannel, useFetchChannelNextPage } from '@/hooks/api'
import useScrollPosition from '@/hooks/useScrollPosition'

import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { VideoGrid } from '@/components/ui/Grid/Grid'
import MinimalVideo from '@/components/Video/MinimalVideo'
import { LoadingVideoGrid } from '@/components/Video/Video'
import { HiCheckCircle } from 'react-icons/hi'

import { numberFormat } from '@/functions/format'

export interface ChannelProps {
  channelPrefix: string
}

export const LoadingChannel = () => (
  <div className="block md:pb-6 md:py-0">
    <div className="bg-gray-100 dark:bg-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-4 pb-4 md:pb-3 flex flex-row items-center relative">
          <div className="hidden md:block md:mr-4 md:rounded-full">
            <div
              className="rounded-full bg-gradient-to-r from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-700"
              style={{
                width: '80px',
                height: '80px',
              }}
            />
          </div>
          <div className="leading-6 space-y-1 pr-2">
            <div className="flex flex-row items-center">
              <div className="w-40 h-6 rounded-sm bg-gradient-to-r from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-700" />
            </div>
            <div>
              <div className="w-20 h-4 rounded-sm bg-gradient-to-r from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="py-6">
      {/* Video grid */}
      <LoadingVideoGrid className="container mx-auto px-4 sm:px-6 lg:px-8" />
    </div>
  </div>
)

const Channel = (props: ChannelProps): JSX.Element => {
  const { id } = useParams()
  const [channel, channelLoading] = useFetchChannel(props.channelPrefix, id)
  const [channelNextPage, channelNextPageLoading] = useFetchChannelNextPage(
    id,
    channel.nextpage
  )

  const scrollPosition = useScrollPosition()

  useEffect(() => {}, [channelNextPage, scrollPosition])

  return (
    <>
      {channelLoading ? (
        <LoadingChannel />
      ) : (
        <>
          <div className="block md:pb-6 md:py-0">
            <NextSeo title={`${channel.name} - Piped`} />
            <div>
              {/* Banner */}
              <div>
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
              <div className="bg-gray-100 dark:bg-neutral-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="pt-4 pb-4 md:pb-3 flex flex-row items-center relative">
                    <div className="hidden md:block md:mr-5 md:rounded-full">
                      {channel.avatarUrl && channel.name && (
                        <Image
                          className="rounded-full bg-gray-200 dark:bg-neutral-800"
                          src={channel.avatarUrl}
                          loading="lazy"
                          alt={channel.name}
                          width={80}
                          height={80}
                          layout="fixed"
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex flex-row items-center">
                        <h1 className="text-2xl font-medium">{channel.name}</h1>
                        {channel.verified && (
                          <HiCheckCircle className="text-gray-600 dark:text-neutral-400 ml-1 h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                          {numberFormat(channel.subscriberCount)} subscribers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-6">
                {/* Video grid */}
                {channel.relatedStreams && (
                  <VideoGrid className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {channel.relatedStreams.map((video, i: number) => (
                      <li key={i.toString()}>
                        <MinimalVideo
                          url={video.url}
                          title={video.title}
                          thumbnail={video.thumbnail}
                          uploaderName={video.uploaderName}
                          uploaderUrl={video.uploaderUrl}
                          uploadedDate={video.uploadedDate}
                          duration={video.duration}
                          views={video.views}
                        />
                      </li>
                    ))}
                  </VideoGrid>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Channel
