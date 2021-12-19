import { useState, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import state from '../state'

const useFetchSuggestions = (query: string) => {
  const [data, setData] = useState([])
  const snap = useSnapshot(state)

  useEffect(() => {
    if (query != '') {
      fetch(snap.apiUrl + '/suggestions?query=' + query)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => {
          console.log(err)
        })
    } else {
      setData([])
    }
  }, [query, snap.apiUrl])

  return data
}

export default useFetchSuggestions
