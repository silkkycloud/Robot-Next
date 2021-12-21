import React from 'react'
import useFetchApi from '../hooks/useFetchApi'

import { NextSeo } from 'next-seo'
import Video from '../components/Video/Video'

const Trending = () => {
  const [trending, trendingLoading] = useFetchApi('/trending?region=US')

  const trendingVideos: JSX.Element = (
    <ul
      role="list"
      className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 sm:space-y-0 lg:grid-cols-3 lg:gap-x-4 xl:grid-cols-4 2xl:grid-cols-6"
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

  return (
    <>
      <NextSeo title="Trending - Piped" />
      <div className="bg-white dark:bg-neutral-900">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {trendingVideos}
          </div>
        </div>
      </div>
    </>
  )
}

export default Trending
