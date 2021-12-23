import { useEffect, useState } from 'react'

import { Suggestions, Trending, Channel } from '@/types/api'

import state from 'state'
import axios from 'axios'

export const useFetchSuggestions = (query: string): Suggestions => {
  const [data, setData] = useState([])

  useEffect(() => {
    if (query != '') {
      axios
        .get(state.apiUrl + '/suggestions', {
          params: {
            query: query,
          },
        })
        .then((res) => {
          setData(res.data)
        })
        .catch((error) => {
          console.log(error.toJSON())
        })
    } else {
      setData([])
    }
  }, [query])

  return data
}

export const useFetchTrending = (region: string): [Trending, boolean] => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
        console.log(error.toJSON())
      })
  }, [])

  return [data, loading]
}

export const useFetchChannel = (
  channelPrefix: string,
  channelId: string | string[] | undefined
): [Channel, boolean] => {
  const [data, setData] = useState({
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

  const allowedPathPrefixes = ['/channel/', '/user/', '/c/']

  useEffect(() => {
    if (channelId != undefined && allowedPathPrefixes.includes(channelPrefix)) {
      axios
        .get(state.apiUrl + channelPrefix + channelId)
        .then((res) => {
          setLoading(false)
          setData(res.data)
        })
        .catch((error) => {
          console.log(error.toJSON())
        })
    }
  }, [channelPrefix, channelId])

  return [data, loading]
}
