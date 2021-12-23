import { useEffect, useState } from "react"
import state from "../state"

import fetchApi from "../functions/fetchApi"

import type { Suggestions, Trending, Channel } from "@/types/api"

export const useSuggestionsApi = (query: string): [Suggestions, boolean] => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query != "") {
      fetchApi(
        state.apiUrl + "/suggestions?query=" + query,
        setData,
        setLoading
      )
    } else {
      setData([])
    }
  }, [query])

  return [data, loading]
}

export const useTrendingApi = (): [Trending, boolean] => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApi(state.apiUrl + "/trending?region=" + "US", setData, setLoading)
  }, [])

  return [data, loading]
}

export const useChannelApi = (
  channelPath: string | string[] | undefined,
  channelId: string | string[] | undefined,
  isReady: boolean
): [Channel, boolean] => {
  const [data, setData] = useState({
    id: "",
    name: "",
    avatarUrl: "",
    bannerUrl: "",
    description: "",
    nextpage: "",
    subscriberCount: 0,
    verified: false,
    relatedStreams: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isReady) {
      fetchApi(state.apiUrl + channelPath + channelId, setData, setLoading)
    }
  }, [channelId, isReady])

  return [data, loading]
}
