import React, { Dispatch, SetStateAction, useState } from 'react'
import useFetchApi from '../../hooks/useFetchApi'

export type SearchSuggestionsProps = {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

const SearchSuggestions = ({query, setQuery}: SearchSuggestionsProps): JSX.Element => {
  const [selectedSuggestion, setSelectedSuggestion] = useState(0)

  const [suggestions] = useFetchApi("/suggestions?query=" + query)

  const handleSelectSuggestion = (index: number) => {
    setSelectedSuggestion(index)
  }

  const suggestionsList: JSX.Element = (
    <ul role="list">
      {suggestions.map((suggestions: string, index: number) =>
        <li
          key={index.toString()}
          className="cursor-pointer px-3 py-3 sm:px-2 sm:py-2 hover:bg-gray-50 dark:hover:bg-neutral-900"
          onClick={() => handleSelectSuggestion(index)}
        >
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                {suggestions}
              </p>
            </div>
          </div>
        </li>
      )}
    </ul>
  )

  return (
    <div className="bg-white dark:bg-neutral-800 shadow rounded-md">
      <div className="overflow-auto w-auto max-h-40 sm:h-auto">
        {suggestionsList}
      </div>
    </div>
  )
}

export default SearchSuggestions
