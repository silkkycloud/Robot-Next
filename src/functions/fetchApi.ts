import { Dispatch, SetStateAction } from 'react'

const fetchApi = async (url: string, setData: Dispatch<SetStateAction<any>>, setLoading: Dispatch<SetStateAction<boolean>>) => {
  try {
    setLoading(true)
    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        setData(res)
      })
  } catch (err) {
    console.error(err)
  }
}

export default fetchApi
