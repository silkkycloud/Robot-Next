import React, { useEffect, useState } from 'react'

import { NextSeo } from 'next-seo'
import { LoadingVideoGrid } from '@/components/Video/Video'
import { VideoGrid } from '@/components/ui/Grid/Grid'
import Video from '@/components/Video/Video'

import { Trending } from '@/types/api'

import axios from 'axios'
import state from '../../state'

export const useFetchTrending = (region: string): [Trending, boolean] => {
  const [data, setData] = useState<Trending>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const ac = new AbortController()

    const fetchTrending = () => {
      if (isMounted) setLoading(true)
      axios
        .get(state.apiUrl + '/trending', {
          signal: ac.signal,
          params: {
            region: region,
          },
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

    fetchTrending()
    return () => {
      ac.abort()
      isMounted = false
    }
  }, [region])

  return [data, loading]
}

const Trending = (): JSX.Element => {
  const [trending, trendingLoading] = useFetchTrending('US')

  return (
    <>
      <NextSeo title="Trending - Piped" />
      <div className="py-6 mx-auto px-4 sm:px-6 lg:px-8">
        {trendingLoading ? (
          <LoadingVideoGrid />
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
    </>
  )
}

export default Trending
