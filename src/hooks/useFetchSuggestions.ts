import { useState, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import state from '../state'

const useFetchSuggestions = (query: string) => {
  const [data, setData] = useState([])
  const snap = useSnapshot(state)

  useEffect(() => {
    fetch(snap.apiUrl + '/suggestions?query=' + query)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [query, snap.apiUrl])

  return data
}

export default useFetchSuggestions
