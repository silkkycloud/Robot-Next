import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import useFetchApi from '../../hooks/useFetchApi'
import useKeyPress from '../../hooks/useKeyPress'

import classNames from '../../functions/classNames'

export type SearchSuggestionsProps = {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

const SearchSuggestions = ({query, setQuery}: SearchSuggestionsProps): JSX.Element => {
  const [selected, setSelected] = useState<number>()
  const [hovered, setHovered] = useState<number>()
  const [cursor, setCursor] = useState<number>(-1)

  const downPress = useKeyPress('ArrowDown')
  const upPress = useKeyPress('ArrowUp')
  const enterPress = useKeyPress('Enter')

  const [suggestions] = useFetchApi('/suggestions?query=' + query)

  useEffect(() => {
    if (suggestions.length && downPress) {
      setCursor(prevState =>
        prevState < suggestions.length - 1 ? prevState + 1 : prevState
      )
    }
  }, [downPress])
  useEffect(() => {
    if (suggestions.length && upPress) {
      setCursor(prevState =>
        prevState > 0 ? prevState - 1 : prevState
      )
    }
  }, [upPress])
  useEffect(() => {
    if (suggestions.length && enterPress) {
      setSelected(cursor)
    }
  }, [enterPress, cursor])
  useEffect(() => {
    if (suggestions.length && hovered) {
      setCursor(hovered)
    }
  }, [hovered])

  const suggestionsList: JSX.Element = (
    <ul
      role="list"
      className="overflow-auto max-h-48 snap-y sm:max-h-60 md:max-h-screen"
    >
      {suggestions.map((suggestion: string, index: number) =>
        <li
          key={index.toString()}
          className={classNames(
            index === cursor ? 'bg-gray-50 dark:bg-neutral-900' : '',
            'rounded-md cursor-pointer snap-center px-3 py-3 sm:px-2 sm:py-2'
          )}
          onClick={() => setSelected(index)}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(undefined)}
        >
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                {suggestion}
              </p>
            </div>
          </div>
        </li>
      )}
    </ul>
  )

  return (
    <div className="flex flex-col h-screen sm:h-auto">
      <div className="bg-white dark:bg-neutral-800 shadow rounded-md">
        <div>
          {suggestionsList}
        </div>
      </div>
    </div>
  )
}

export default SearchSuggestions
