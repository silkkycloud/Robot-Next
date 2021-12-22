import React from 'react'
import { useTrendingApi } from '../../hooks/useApi'

import { NextSeo } from 'next-seo'
import { VideoGrid } from '../../components/lib/Grid/Grid'
import Video from '../../components/Video/Video'
import LoadingVideos from '../../components/Loading/LoadingVideos'

export type TrendingVideosProps = {
  // TODO: Statically type API responses
  trending: any[]
}

export const TrendingVideos = ({trending}: TrendingVideosProps): JSX.Element => (
  <VideoGrid>
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
  </VideoGrid>
)

const Trending = (): JSX.Element => {
  const [trending, trendingLoading] = useTrendingApi()

  return (
    <>
      <NextSeo title="Trending - Piped" />
      <div className="bg-white dark:bg-neutral-900">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {trendingLoading ? (
              <LoadingVideos />
            ) : (
              <TrendingVideos trending={trending} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Trending
