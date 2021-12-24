import React from 'react'
import { useFetchTrending } from '@/hooks/api'

import { NextSeo } from 'next-seo'
import PlaceholderVideos from '@/components/Placeholder/PlaceholderVideos'
import { VideoGrid } from '@/components/ui/Grid/Grid'
import Video from '@/components/Video/Video'

const Trending = (): JSX.Element => {
  const [trending, trendingLoading] = useFetchTrending('US')

  return (
    <div className="py-6 mx-auto px-4 sm:px-6 lg:px-8">
      <NextSeo title="Trending - Piped" />
      {trendingLoading ? (
        <PlaceholderVideos />
      ) : (
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
      )}
    </div>
  )
}

export default Trending
