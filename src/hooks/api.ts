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
