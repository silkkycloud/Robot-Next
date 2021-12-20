import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import useFetchApi from '../../hooks/useFetchApi'
import useKeyPress from '../../hooks/useKeyPress'

export type SearchSuggestionsProps = {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

const SearchSuggestions = ({query, setQuery}: SearchSuggestionsProps): JSX.Element => {
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1)

  const [suggestions] = useFetchApi("/suggestions?query=" + query)
  const downPress = useKeyPress("ArrowDown")
  const upPress = useKeyPress("ArrowUp")

  useEffect(() => {
    if (suggestions.length && downPress) {
      setSelectedSuggestion(prevState =>
        prevState < suggestions.length - 1 ? prevState + 1 : prevState
      )
    }
  }, [downPress, suggestions.length])
  useEffect(() => {
    if (suggestions.length && upPress) {
      setSelectedSuggestion(prevState => (prevState > 0 ? prevState - 1 : prevState))
    }
  }, [upPress, suggestions.length])

  const suggestionsList: JSX.Element = (
    <ul role="list">
      {suggestions.map((suggestions: string, index: number) =>
        <li
          key={index.toString()}
          className={`cursor-pointer px-3 py-3 sm:px-2 sm:py-2 ${index === selectedSuggestion ? 'bg-gray-50 dark:bg-neutral-900' : null}`}
          onClick={() => setSelectedSuggestion(index)}
          onMouseEnter={() => setSelectedSuggestion(index)}
          onMouseLeave={() => setSelectedSuggestion(-1)}
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
      <div className="overflow-auto w-auto h-auto">
        {suggestionsList}
      </div>
    </div>
  )
}

export default SearchSuggestions
