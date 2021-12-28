import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from '@/functions/classNames'
import useKeyPress from '@/hooks/useKeyPress'

import { Dialog, Transition } from '@headlessui/react'
import { HiX } from 'react-icons/hi'

import { Suggestions } from '@/types/api'

import state from 'state'
import axios from 'axios'

export const useFetchSuggestions = (query: string): [Suggestions, boolean] => {
  const [data, setData] = useState<Suggestions>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const ac = new AbortController()

    const fetchSuggestions = () => {
      if (isMounted) setLoading(true)
      axios
        .get(state.apiUrl + '/suggestions', {
          signal: ac.signal,
          params: {
            query: query,
          },
        })
        .then((res) => {
          if (isMounted) {
            setData(res.data)
            setLoading(false)
          }
        })
        .catch((error) => {
          if (isMounted) setLoading(false)
          console.log(error)
        })
    }

    if (query != '') fetchSuggestions()
    else setData([])
    return () => {
      ac.abort()
      isMounted = false
    }
  }, [query])

  return [data, loading]
}

const Suggestions = () => {
  return <div></div>
}

export interface SearchBarProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const SearchBar = (props: SearchBarProps) => {
  const navigate = useNavigate()

  const [selected, setSelected] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [hovered, setHovered] = useState<string>('')
  const [cursor, setCursor] = useState<number>()

  const downPress = useKeyPress('ArrowDown')
  const upPress = useKeyPress('ArrowUp')
  const enterPress = useKeyPress('Enter')

  const [suggestions, suggestionsLoading] = useFetchSuggestions(query)

  useEffect(() => {
    if (suggestions.length && downPress) {
      setCursor((prevState) => {
        if (prevState != undefined)
          if (prevState < suggestions.length - 1) return prevState + 1
          else return prevState
        else setCursor(0)
      })
    }
  }, [downPress, suggestions.length])
  useEffect(() => {
    if (suggestions.length && upPress) {
      setCursor((prevState) => {
        if (prevState != undefined)
          if (prevState > 0) return prevState - 1
          else return prevState
        else setCursor(0)
      })
    }
  }, [suggestions.length, upPress])
  useEffect(() => {
    if (enterPress) {
      if (cursor != undefined) setSelected(suggestions[cursor])
      else setSelected(search)
    }

    return () => setSelected('')
  }, [enterPress, cursor, suggestions, search])

  useEffect(() => {
    if (cursor != undefined) setSearch(suggestions[cursor])
  }, [cursor, suggestions])
  useEffect(() => {
    if (suggestions.length && hovered) setCursor(suggestions.indexOf(hovered))

    return () => setCursor(undefined)
  }, [hovered, suggestions])
  useEffect(() => {
    if (selected != '') {
      navigate('/search?q=' + selected)
      props.setOpen(false)
    }
  }, [navigate, props, selected])

  const suggestionsList: JSX.Element = (
    <ul
      role="list"
      className="overflow-auto max-h-48 snap-y sm:max-h-60 md:max-h-screen"
    >
      {suggestions.map((suggestion: string, i: number) => (
        <li
          key={i.toString()}
          className={classNames(
            i === cursor ? 'bg-gray-50 dark:bg-neutral-900' : '',
            'rounded-md cursor-pointer snap-center px-3 py-3 sm:px-2 sm:py-2'
          )}
          onClick={() => setSelected(suggestion)}
          onMouseEnter={() => setHovered(suggestion)}
          onMouseLeave={() => setHovered('')}
        >
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                {suggestion}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-x-0 top-0 overflow-y-auto"
        onClose={props.setOpen}
      >
        <div className="flex items-end justify-center sm:pt-4 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-black dark:bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white dark:bg-neutral-800 sm:rounded-lg px-4 pt-5 pb-4 text-left overflow-visible shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:p-4">
              <div className="block md:hidden absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white dark:bg-neutral-800 rounded-md text-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                  onClick={() => props.setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <HiX className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto text-center">
                  <Dialog.Title
                    as="h2"
                    className="text-xl leading-5 font-medium text-gray-900 dark:text-white"
                  >
                    Search
                  </Dialog.Title>
                </div>
              </div>
              <div className="mt-2">
                <div className="px-2 py-2">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <input
                    type="text"
                    value={search}
                    name="search"
                    id="search"
                    className="shadow-sm dark:shadow-md bg-white dark:bg-neutral-800 focus:ring-red-600 focus:border-red-600 block w-full sm:text-sm border-gray-300 dark:border-neutral-900 rounded-md"
                    onChange={(query) => {
                      setSearch(query.target.value)
                      setQuery(query.target.value)
                    }}
                  />
                </div>
                <div className="px-2">
                  {/* SearchBar Suggestions */}
                  <div className="flex flex-col h-screen sm:h-auto">
                    <div className="bg-white dark:bg-neutral-800 shadow rounded-md">
                      <div>{suggestionsList}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SearchBar
