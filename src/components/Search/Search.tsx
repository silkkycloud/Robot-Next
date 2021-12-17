import React from 'react'
import { useState } from 'react'

import { AiOutlineSearch } from 'react-icons/ai'

const Search = () => {

  const [query, setQuery] = useState('')

  return (
    <>
      {/* Search bar */}
      <div className="w-full flex md:ml-0">
        <div className="relative w-full text-gray-400 focus-within:text-red-600">
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
            <AiOutlineSearch className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-grays-400 focus:ring-0 focus:border-transparent sm:text-sm"
            placeholder="Search"
            type="text"
            name="search"
            role="search"
          />
        </div>
      </div>
    </>
  )
}

export default Search
