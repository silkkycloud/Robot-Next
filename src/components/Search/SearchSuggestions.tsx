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

  return (
    <div className="bg-white shadow rounded-md">
      <div className="overflow-auto w-auto max-h-40 sm:h-auto">
        <ul role="list">
          {suggestions.map((suggestions: string, index: number) => (
            <li
              key={index}
              className="cursor-pointer px-3 py-3 sm:px-2 sm:py-2 hover:bg-gray-50 hover:text-gray-900"
              onClick={() => handleSelectSuggestion(index)}
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
    </div>
  )
}

export default SearchSuggestions
