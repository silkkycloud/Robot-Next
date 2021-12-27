import { useEffect, useState } from 'react'

import {
  Suggestions,
  Search,
  Trending,
  Channel,
  ChannelNextPage,
} from '@/types/api'

import state from 'state'
import axios from 'axios'

export const useFetchSuggestions = (query: string): [Suggestions, boolean] => {
  const [data, setData] = useState<Suggestions>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query != '') {
      setLoading(true)
      axios
        .get(state.apiUrl + '/suggestions', {
          params: {
            query: query,
          },
        })
        .then((res) => {
          setLoading(false)
          setData(res.data)
        })
        .catch((error) => {
          setLoading(false)
          console.log(error.toJSON())
        })
    } else {
      setData([])
    }
  }, [query])

  return [data, loading]
}

export const useFetchSearch = (
  query: string | null,
  filter: string
): [Search, boolean] => {
  const [data, setData] = useState<Search>({
    nextpage: '',
    corrected: false,
  })
  const [loading, setLoading] = useState(true)

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
    if (query != null && searchFilters.includes(filter)) {
      setLoading(true)
      axios
        .get(state.apiUrl + '/search', {
          params: {
            q: query,
            filter: filter,
          },
        })
        .then((res) => {
          setLoading(false)
          setData(res.data)
        })
        .catch((error) => {
          setLoading(false)
          console.log(error.toJSON())
        })
    }
  }, [query, filter])

  return [data, loading]
}

export const useFetchSearchNextPage = (
  query: string | null,
  filter: string,
  nextpage: string
): [Search, boolean] => {
  const [data, setData] = useState<Search>({
    nextpage: '',
    corrected: false,
  })
  const [loading, setLoading] = useState(true)

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
    if (query != null && nextpage != '' && searchFilters.includes(filter)) {
      setLoading(true)
      axios
        .get(state.apiUrl + '/nextpage/search', {
          params: {
            nextpage: nextpage,
            q: query,
            filter: filter,
          },
        })
        .then((res) => {
          setLoading(false)
          setData(res.data)
        })
        .catch((error) => {
          setLoading(false)
          console.log(error.toJSON())
        })
    }
  }, [query, filter, nextpage])

  return [data, loading]
}

export const useFetchTrending = (region: string): [Trending, boolean] => {
  const [data, setData] = useState<Trending>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get(state.apiUrl + '/trending', {
        params: {
          region: region,
        },
      })
      .then((res) => {
        setLoading(false)
        setData(res.data)
      })
      .catch((error) => {
        setLoading(false)
        console.log(error.toJSON())
      })
  }, [])

  return [data, loading]
}

export const useFetchChannel = (
  channelPrefix: string,
  channelId: string | undefined
): [Channel, boolean] => {
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
  const [loading, setLoading] = useState(true)

  const channelPathPrefixes = ['/channel/', '/user/', '/c/']

  useEffect(() => {
    if (channelId != undefined && channelPathPrefixes.includes(channelPrefix)) {
      setLoading(true)
      axios
        .get(state.apiUrl + channelPrefix + channelId)
        .then((res) => {
          setLoading(false)
          setData(res.data)
        })
        .catch((error) => {
          setLoading(false)
          console.log(error.toJSON())
        })
    }
  }, [channelPrefix, channelId])

  return [data, loading]
}

export const useFetchChannelNextPage = (
  channelId: string | undefined,
  nextpage: string
): [ChannelNextPage, boolean] => {
  const [data, setData] = useState<ChannelNextPage>({
    nextpage: '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (channelId != undefined && nextpage != '') {
      setLoading(true)
      axios
        .get(state.apiUrl + '/nextpage/channel/' + channelId, {
          params: {
            nextpage: nextpage,
          },
        })
        .then((res) => {
          setLoading(false)
          setData(res.data)
        })
        .catch((error) => {
          setLoading(false)
          console.log(error.toJSON())
        })
    }
  }, [channelId, nextpage])

  return [data, loading]
}
