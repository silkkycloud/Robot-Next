import { useState, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import state from '../state'

const useFetchApi = (path: string): [any[], boolean] => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const snap = useSnapshot(state)

  useEffect(() => {
    const fetchApi = async (path: string) => {
      try {
        setLoading(true)
        await fetch(snap.apiUrl + path)
          .then((res) => res.json())
          .then((res) => {
            setLoading(false)
            setData(res)
          })
      } catch (err) {
        console.error(err)
      }
    }
    fetchApi(path)
  }, [path])

  return [data, loading]
}

export default useFetchApi
