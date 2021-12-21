import React from 'react'
import useFetchApi from '../hooks/useFetchApi'

import { NextSeo } from 'next-seo'
import Video from '../components/Video/Video'
import LoadingVideo from '../components/Loading/LoadingVideo'

export type TrendingVideosProps = {
  // TODO: Statically type API responses
  trending: any[]
}

// This is a very stupid and temporary solution, it will be removed.
const LoadingTrendingVideos = (): JSX.Element => (
  <ul
    role="list"
    className="mx-auto space-y-5 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 sm:space-y-0 lg:grid-cols-3 lg:gap-x-4 xl:grid-cols-4 2xl:grid-cols-6"
  >
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
  </ul>
)

export const TrendingVideos = ({trending}: TrendingVideosProps): JSX.Element => (
  <ul
    role="list"
    className="mx-auto space-y-5 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 sm:space-y-0 lg:grid-cols-3 lg:gap-x-4 xl:grid-cols-4 2xl:grid-cols-6"
  >
    {trending.map((video, i: number) => (
      <li key={i.toString()}>
        <Video
          url={video.url}
          title={video.title}
          thumbnail={video.thumbnail}
          uploaderName={video.uploaderName}
          uploaderUrl={video.uploaderUrl}
          uploaderAvatar={video.uploaderAvatar}
          uploadedDate={video.uploadedDate}
          duration={video.duration}
          views={video.views}
          uploaderVerified={video.uploaderVerified}
        />
      </li>
    ))}
  </ul>
)

const Trending = (): JSX.Element => {
  const [trending, trendingLoading] = useFetchApi('/trending?region=US')

  return (
    <>
      <NextSeo title="Trending - Piped" />
      <div className="bg-white dark:bg-neutral-900">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {trendingLoading ? <LoadingTrendingVideos /> : <TrendingVideos trending={trending} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default Trending
