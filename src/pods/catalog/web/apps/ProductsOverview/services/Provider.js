import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { map } from 'rxjs/operators'
import { observe } from 'frint-react'

import { sortOptions, itemsPerPageOptions } from '../services/constants'

export const Context = createContext()

const Provider = ({ children, regionData: { searchTerm } }) => {

  const [activeFilters, setActiveFilters] = useState([])
  const [sortType, setSortType] = useState(sortOptions[0].name)
  const [resultsPerPage, setResultsPerPage] = useState(itemsPerPageOptions[0].name)

    const handleActiveFilters = (operation, filter) => () => {
    if (operation === 'push') {
      setActiveFilters([...activeFilters, filter ])
    } else {
      let updatedActiveFilters = [...activeFilters].filter(item => item !== filter)
      setActiveFilters(updatedActiveFilters)
    }
  }

  const data = {
    activeFilters,
    handleActiveFilters,
    resultsPerPage,
    setResultsPerPage,
    sortType,
    setSortType,
    searchTerm
  }

  return (
  <Context.Provider value={{data}}>{children}</Context.Provider>
)
}

const ObservedProvider = observe((app, props$) => {
  const region = app.get('region')
  const regionData$ = region
    .getData$()
    .pipe(map(regionData => ({ regionData })))
  return regionData$
})(Provider)

ObservedProvider.propTypes = {
  regionData: PropTypes.object
}

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  regionData: PropTypes.object
}

export default ObservedProvider

