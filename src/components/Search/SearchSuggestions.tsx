import React, { Dispatch, Fragment, SetStateAction } from 'react'
import useFetchSuggestions from '../../hooks/useFetchSuggestions'

import { Transition } from '@headlessui/react'

export type SearchSuggestionsProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

const SearchSuggestions = ({open, setOpen, query, setQuery}: SearchSuggestionsProps) => {
  const suggestions = useFetchSuggestions(query)

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <div className="mt-2 bg-white shadow sm:rounded-md">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="overflow-auto w-auto max-h-40">
              <ul
                role="list"
                className="divide-y divide-gray-100"
                onClick={() => setOpen(true)}
              >
                {suggestions.map((suggestions, index) => (
                  <li
                    key={index}
                    className="cursor-pointer px-3 py-3 sm:px-2 sm:py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {suggestions}
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
