import React from 'react'

const Filter = () => {
  return (
       <div>
            <p>Filter shown with</p><input onChange={handleFilter}/>
      </div>
  )
}

export default Filter