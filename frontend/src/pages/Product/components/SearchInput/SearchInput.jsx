import React, { useState } from 'react'
import searchIcon from 'assets/icons/search.svg'

function SearchInput({ onChange }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onChange(searchTerm)
  }

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <input
        type='text'
        placeholder='O que você procura?'
        value={searchTerm}
        onChange={handleChange}
        className='w-full appearance-none truncate rounded-xl bg-white p-5 text-base font-medium text-gray-900'
      />
    </form>
  )
}

export default SearchInput
