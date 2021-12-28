import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { NextSeo } from 'next-seo'
import Video, { LoadingVideoGrid } from '@/components/Video/Video'
import ChannelItem from '@/components/Channel/ChannelItem'
import PlaylistItem from '@/components/Playlist/PlaylistItem'
import Menu from '@/components/ui/Menu/Menu'
import { VideoGrid } from '@/components/ui/Grid/Grid'

import { Search } from '@/types/api'

import axios from 'axios'
import state from '../../state'

export const useFetchSearch = (
  query: string | null,
  filter: string
): [Search, boolean] => {
  const [data, setData] = useState<Search>({
    nextpage: '',
    corrected: false,
  })
  const [loading, setLoading] = useState(false)

  const searchFilters = [
    'all',
    'videos',
    'channels',
    'playlists',
    'music_songs',
    'music_videos',
    'music_albums',
    'music_playlists',
  ]

  useEffect(() => {
    let ignore = false
    const fetchSearchResults = async () => {
      if (query != null && searchFilters.includes(filter)) {
        try {
          setLoading(true)
          const request = await axios.get(state.apiUrl + '/search', {
            params: {
              q: query,
              filter: filter,
            },
          })
          if (!ignore) setData(request.data)
          setLoading(false)
        } catch (error) {
          setLoading(false)
          console.error(error)
        }
      }
    }

    fetchSearchResults()
    return () => {
      ignore = true
    }
  }, [query, filter])

  return [data, loading]
}

export const SearchMenu = () => <div></div>

export const Result = (props: Search) => <div></div>

const Search = () => {
  const [searchParams] = useSearchParams()
  const [selectedFilter, setSelectedFilter] = useState({ id: 0, name: 'all' })
  const [results, resultsLoading] = useFetchSearch(
    searchParams.get('q'),
    selectedFilter.name
  )

  return (
    <>
      <NextSeo title="Search - Piped" />

      <div className="bg-gray-100 dark:bg-neutral-800">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="w-full sm:max-w-xs">
            <Menu
              selected={selectedFilter}
              setSelected={setSelectedFilter}
              listName="Filter"
              listItems={[
                { id: 0, name: 'all' },
                { id: 1, name: 'videos' },
                { id: 2, name: 'channels' },
                { id: 3, name: 'playlists' },
                { id: 4, name: 'music_songs' },
                { id: 5, name: 'music_videos' },
                { id: 6, name: 'music_albums' },
                { id: 7, name: 'music_playlists' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="py-6 mx-auto px-4 sm:px-6 lg:px-8">
        {resultsLoading ? (
          <LoadingVideoGrid />
        ) : (
          <>
            {results.items && (
              <VideoGrid>
                {results.items.map((item, i: number) => (
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
                    {item.name && item.uploaderName && (
                      <PlaylistItem
                        name={item.name}
                        thumbnail={item.thumbnail}
                        url={item.url}
                        uploaderName={item.uploaderName}
                        videos={item.videos}
                      />
                    )}
                    {item.name && (
                      <ChannelItem
                        name={item.name}
                        thumbnail={item.thumbnail}
                        url={item.url}
                        description={item.description}
                        subscribers={item.subscribers}
                        videos={item.videos}
                        verified={item.verified}
                      />
                    )}
                  </li>
                ))}
              </VideoGrid>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Search
