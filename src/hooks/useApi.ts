import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import state from '../state'

import fetchApi from '../functions/fetchApi'

import type {
  Suggestions,
  Trending,
  Channel
} from '../types/api'

export const useSuggestionsApi = (query: string): [Suggestions, boolean] => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const snap = useSnapshot(state)

  useEffect(() => {
    fetchApi(snap.apiUrl + '/suggestions?query=' + query, setData, setLoading)
  }, [query])

  return [data, loading]
}

export const useTrendingApi = (): [Trending, boolean] => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const snap = useSnapshot(state)

  useEffect(() => {
    fetchApi(snap.apiUrl + '/trending?region=' + 'US', setData, setLoading)
  }, [])

  return [data, loading]
}

export const useChannelApi = (channelId: string | string[] | undefined, isReady: boolean): [Channel, boolean] => {
  const [data, setData] = useState({
    id: '',
    name: '',
    avatarUrl: '',
    bannerUrl: '',
    description: '',
    nextpage: '',
    subscriberCount: 0,
    verified: false,
    relatedStreams: []
  })
  const [loading, setLoading] = useState(true)
  const snap = useSnapshot(state)

  useEffect(() => {
    if (isReady) {
      fetchApi(snap.apiUrl + '/channel/' + channelId, setData, setLoading)
    }
}, [channelId])

  return [data, loading]
}
