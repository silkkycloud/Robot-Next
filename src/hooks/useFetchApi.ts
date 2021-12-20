import { useState, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import state from '../state'

const useFetchApi = (path: string) => {
  const [data, setData] = useState([])
  const snap = useSnapshot(state)

  useEffect(() => {
    const fetchApi = async (path: string) => {
      try {
        const res = await fetch(snap.apiUrl + path)
        setData(await res.json())
      } catch (err) {
        console.log(err)
      }
    }
    fetchApi(path)
  }, [path, snap.apiUrl])

  return data
}

export default useFetchApi
