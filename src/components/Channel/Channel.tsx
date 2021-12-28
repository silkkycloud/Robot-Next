import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useScrollPosition from '@/hooks/useScrollPosition'

import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { VideoGrid } from '@/components/ui/Grid/Grid'
import MinimalVideo from '@/components/Video/MinimalVideo'
import { LoadingVideoGrid } from '@/components/Video/Video'
import Spinner from '@/components/ui/Loading/Spinner'
import { HiCheckCircle } from 'react-icons/hi'

import { numberFormat } from '@/functions/format'
import { purifyHTML } from '@/functions/purify'
import urlify from '@/functions/urlify'

import { Channel } from '@/types/api'

import axios from 'axios'
import state from 'state'

export const useFetchChannel = (
  channelPrefix: string,
  channelId: string | undefined
): [Channel, Dispatch<SetStateAction<Channel>>, boolean] => {
  const [data, setData] = useState<Channel>({
    id: '',
    name: '',
    avatarUrl: '',
    bannerUrl: '',
    description: '',
    nextpage: '',
    subscriberCount: 0,
    verified: false,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const ac = new AbortController()

    const fetchChannel = () => {
      const channelPathPrefixes = ['/channel/', '/user/', '/c/']
      if (
        channelId != undefined &&
        channelPathPrefixes.includes(channelPrefix)
      ) {
        if (isMounted) setLoading(true)
        axios
          .get(state.apiUrl + channelPrefix + channelId, {
            signal: ac.signal,
          })
          .then((res) => {
            if (isMounted) {
              setData(res.data)
              setLoading(false)
            }
          })
          .catch((error) => {
            if (isMounted) setLoading(false)
            console.log(error)
          })
      }
    }

    fetchChannel()
    return () => {
      ac.abort()
      isMounted = false
    }
  }, [channelPrefix, channelId])

  return [data, setData, loading]
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

export interface ChannelProps extends Channel {
  nextPageLoading?: boolean
}

const Channel = (props: ChannelProps) => (
  <div className="md:pb-6 md:py-0">
    {props.bannerUrl && (
      // TODO: Fix next/image component to work with these styles
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="w-full bg-gray-300 dark:bg-neutral-800"
        src={props.bannerUrl}
        loading="lazy"
        alt={props.name}
      />
    )}
    <div className="bg-gray-100 dark:bg-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-4 pb-4 md:pb-3 flex flex-row items-center relative">
          <div className="hidden md:block md:mr-5 md:rounded-full">
            {props.avatarUrl && (
              <Image
                className="rounded-full bg-gray-200 dark:bg-neutral-800"
                src={props.avatarUrl}
                loading="lazy"
                alt={props.name}
                width={80}
                height={80}
                layout="fixed"
              />
            )}
          </div>
          <div>
            <div className="flex flex-row items-center">
              <h1 className="text-2xl font-medium">{props.name}</h1>
              {props.verified && (
                <HiCheckCircle className="text-gray-600 dark:text-neutral-400 ml-1 h-4 w-4" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-neutral-400">
                {numberFormat(props.subscriberCount)} subscribers
              </p>
            </div>
          </div>
        </div>
        {props.description && (
          <div className="pb-4 md:pb-3">
            <p className="whitespace-pre-wrap">
              <span
                dangerouslySetInnerHTML={{
                  __html: purifyHTML(urlify(props.description)),
                }}
              />
            </p>
          </div>
        )}
      </div>
    </div>
    {/* Video grid */}
    {props.relatedStreams && (
      <div className="py-6">
        <VideoGrid className="container mx-auto px-4 sm:px-6 lg:px-8">
          {props.relatedStreams.map((video, i: number) => (
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
        {props.nextPageLoading && (
          <div className="py-6 flex justify-center">
            <Spinner className="h-10 w-10" />
          </div>
        )}
      </div>
    )}
  </div>
)

export interface ChannelPageProps {
  channelPrefix: string
}

const ChannelPage = (props: ChannelPageProps) => {
  const { id } = useParams()
  const [channel, setChannel, channelLoading] = useFetchChannel(
    props.channelPrefix,
    id
  )

  const [nextPageLoading, setNextPageLoading] = useState(false)
  const scrollPosition = useScrollPosition()
  const mountPosition =
    window.innerHeight + scrollPosition >=
    document.body.offsetHeight - window.innerHeight

  useEffect(() => {
    let isMounted = true

    const ac = new AbortController()

    const fetchNextPage = () => {
      if (channel.relatedStreams && channel.nextpage && channel.id) {
        if (isMounted) setNextPageLoading(true)
        axios
          .get(state.apiUrl + '/nextpage/channel/' + channel.id, {
            signal: ac.signal,
            params: {
              nextpage: channel.nextpage,
            },
          })
          .then((res) => {
            if (isMounted) {
              setChannel((prevState) => ({
                ...prevState,
                nextpage: res.data.nextpage,
                relatedStreams: [
                  // @ts-ignore
                  ...prevState.relatedStreams,
                  ...res.data.relatedStreams,
                ],
              }))
              setNextPageLoading(false)
            }
          })
          .catch((error) => {
            if (isMounted) setNextPageLoading(false)
            console.log(error)
          })
      }
    }

    if (mountPosition) fetchNextPage()
    return () => {
      ac.abort()
      isMounted = false
    }
  }, [
    mountPosition,
    channel.relatedStreams,
    channel.id,
    channel.nextpage,
    setChannel,
  ])

  return (
    <>
      {channelLoading ? (
        <LoadingChannel />
      ) : (
        <div>
          <NextSeo title={`${channel.name} - Piped`} />
          <Channel
            id={channel.id}
            name={channel.name}
            avatarUrl={channel.avatarUrl}
            bannerUrl={channel.bannerUrl}
            description={channel.description}
            subscriberCount={channel.subscriberCount}
            verified={channel.verified}
            nextPageLoading={nextPageLoading}
            relatedStreams={channel.relatedStreams}
          />
        </div>
      )}
    </>
  )
}

export default ChannelPage
