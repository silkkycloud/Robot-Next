import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'
import useFetchApi from '../../hooks/useFetchApi'

import { Transition } from '@headlessui/react'

export type SearchSuggestionsProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

const SearchSuggestions = ({open, setOpen, query, setQuery}: SearchSuggestionsProps) => {
  const [selectedSuggestion, setSelectedSuggestion] = useState(0)

  const [suggestions, suggestionsLoading] = useFetchApi("/suggestions?query=" + query)

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <div className="bg-white shadow rounded-md">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="overflow-auto w-auto max-h-40 sm:h-auto">
              <ul
                role="list"
              >
                {suggestions.map((suggestions: string, index: number) => (
                  <li
                    key={index}
                    className="cursor-pointer px-3 py-3 sm:px-2 sm:py-2 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setSelectedSuggestion(index)}
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          {suggestions}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Transition.Child>
        </div>
      </Transition.Root>
    </>
  )
}

export default SearchSuggestions
