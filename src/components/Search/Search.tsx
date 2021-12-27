import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFetchSearch } from '@/hooks/api'

import Video, { LoadingVideoGrid } from '@/components/Video/Video'
import { VideoGrid } from '@/components/ui/Grid/Grid'
import { NextSeo } from 'next-seo'

const Search = () => {
  const [searchParams] = useSearchParams()
  const [search, searchLoading] = useFetchSearch(searchParams.get('q'), 'all')

  return (
    <div className="py-6 mx-auto px-4 sm:px-6 lg:px-8">
      <NextSeo title={`Search - Piped`} />
      {searchLoading ? (
        <LoadingVideoGrid />
      ) : (
        <div>
          {search.items && (
            <VideoGrid>
              {search.items.map((item, i: number) => (
                <li key={i.toString()}>
                  {/* Check if item is a Video or a Channel */}
                  {item.title && (
                    <Video
                      url={item.url}
                      title={item.title}
                      thumbnail={item.thumbnail}
                      uploaderName={item.uploaderName}
                      uploaderUrl={item.uploaderUrl}
                      uploaderAvatar={item.uploaderAvatar}
                      uploadedDate={item.uploadedDate}
                      duration={item.duration}
                      views={item.views}
                      uploaderVerified={item.uploaderVerified}
                    />
                  )}
                  {item.name && <div>{item.name}</div>}
                </li>
              ))}
            </VideoGrid>
          )}
        </div>
      )}
    </div>
  )
}

export default Search
