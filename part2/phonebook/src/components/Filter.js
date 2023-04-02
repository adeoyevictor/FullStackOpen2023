import React from 'react'

const Filter = ({filterName, handleFilterChange}) => {
  return (
    <input type='search' value={filterName} onChange={handleFilterChange} />
  )
}

export default Filter