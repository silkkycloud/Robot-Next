import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchChannel, useFetchChannelNextPage } from '@/hooks/api'
import useScrollPosition from '@/hooks/useScrollPosition'

import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { VideoGrid } from '@/components/ui/Grid/Grid'
import MinimalVideo from '@/components/Video/MinimalVideo'
import { LoadingVideoGrid } from '@/components/Video/Video'
import Spinner from '@/components/ui/Loading/Spinner'
import { HiCheckCircle } from 'react-icons/hi'

import DOMPurify from 'dompurify'
import { numberFormat } from '@/functions/format'
import urlify from '@/functions/urlify'

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
              className="rounded-full animate-pulse bg-gradient-to-r from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-700"
              style={{
                width: '80px',
                height: '80px',
              }}
            />
          </div>
          <div className="leading-6 space-y-1 pr-2">
            <div className="flex flex-row items-center">
              <div className="w-40 h-6 rounded-sm animate-pulse bg-gradient-to-r from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-700" />
            </div>
            <div>
              <div className="w-20 h-4 rounded-sm animate-pulse bg-gradient-to-r from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-700" />
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
  const [channelState, setChannelState] = useState(channel)
  const [channelNextPage, channelNextPageLoading] = useFetchChannelNextPage(
    channelState.id,
    channelState.nextpage
  )
  const scrollPosition = useScrollPosition()

  useEffect(() => {
    if (
      !channelLoading &&
      !channelNextPageLoading &&
      channelState.nextpage &&
      channelState.relatedStreams
    ) {
      if (
        window.innerHeight + scrollPosition >=
        document.body.offsetHeight - window.innerHeight
      ) {
        channel.nextpage = channelNextPage.nextpage
        channelNextPage.relatedStreams?.map((videos) =>
          channel.relatedStreams?.push(videos)
        )
      }
    }
  }, [scrollPosition, channelNextPage])

  useEffect(() => {
    setChannelState(channel)
  }, [channel])

  return (
    <>
      {channelLoading ? (
        <LoadingChannel />
      ) : (
        <>
          <div className="block md:pb-6 md:py-0">
            <NextSeo title={`${channelState.name} - Piped`} />
            <div>
              {/* Banner */}
              <div>
                {channelState.bannerUrl && channelState.name && (
                  // TODO: Can't get next/image component to work with these styles
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="w-full bg-gray-300 dark:bg-neutral-800"
                    src={channelState.bannerUrl}
                    loading="lazy"
                    alt={channelState.name}
                  />
                )}
              </div>
              <div className="bg-gray-100 dark:bg-neutral-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="pt-4 pb-4 md:pb-3 flex flex-row items-center relative">
                    <div className="hidden md:block md:mr-5 md:rounded-full">
                      {channelState.avatarUrl && channelState.name && (
                        <Image
                          className="rounded-full bg-gray-200 dark:bg-neutral-800"
                          src={channelState.avatarUrl}
                          loading="lazy"
                          alt={channelState.name}
                          width={80}
                          height={80}
                          layout="fixed"
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex flex-row items-center">
                        <h1 className="text-2xl font-medium">{channel.name}</h1>
                        {channelState.verified && (
                          <HiCheckCircle className="text-gray-600 dark:text-neutral-400 ml-1 h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                          {numberFormat(channelState.subscriberCount)}{' '}
                          subscribers
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pb-4 md:pb-3">
                    <p className="whitespace-pre-wrap">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            urlify(channelState.description)
                          ),
                        }}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-6">
                {/* Video grid */}
                {channelState.relatedStreams && (
                  <VideoGrid className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {channelState.relatedStreams.map((video, i: number) => (
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
                {channelNextPageLoading && (
                  <div className="py-6 flex justify-center">
                    <Spinner className="h-10 w-10" />
                  </div>
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
