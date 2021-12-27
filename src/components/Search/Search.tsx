import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFetchSearch, useFetchSearchNextPage } from '@/hooks/api'
import useScrollPosition from '@/hooks/useScrollPosition'

import { NextSeo } from 'next-seo'
import Video, { LoadingVideoGrid } from '@/components/Video/Video'
import { VideoGrid } from '@/components/ui/Grid/Grid'
import Spinner from '@/components/ui/Loading/Spinner'

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  const [search, searchLoading] = useFetchSearch(query, 'all')
  const [searchState, setSearchState] = useState(search)
  const [searchNextPage, searchNextPageLoading] = useFetchSearchNextPage(
    query,
    'all',
    searchState.nextpage
  )
  const scrollPosition = useScrollPosition()

  useEffect(() => {
    if (
      !searchLoading &&
      !searchNextPageLoading &&
      searchState.nextpage &&
      searchState.items
    ) {
      if (
        window.innerHeight + scrollPosition >=
        document.body.offsetHeight - window.innerHeight
      ) {
        search.nextpage = searchNextPage.nextpage
        searchNextPage.items?.map((item) => search.items?.push(item))
      }
    }
  }, [scrollPosition, searchNextPage])

  useEffect(() => {
    setSearchState(search)
  }, [search])

  return (
    <div className="py-6 mx-auto px-4 sm:px-6 lg:px-8">
      <NextSeo title="Search - Piped" />
      {searchLoading ? (
        <LoadingVideoGrid />
      ) : (
        <>
          {searchState.items && (
            <VideoGrid>
              {searchState.items.map((item, i: number) => (
                <li key={i.toString()}>
                  {/* Check if item is a Video, Channel or Playlist */}
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
                  {item.name && item.uploaderName && <div>{item.name}</div>}
                </li>
              ))}
            </VideoGrid>
          )}
          {searchNextPageLoading && (
            <div className="py-6 flex justify-center">
              <Spinner className="h-10 w-10" />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Search
