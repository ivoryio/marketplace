import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { map } from 'rxjs/operators'
import { observe } from 'frint-react'

import api from '../../../services/catalog.dataservice'
import { isResponseOk } from '../../../services/helpers'
import { SearchBox } from '../components'
import { sortOptions, initialActiveFilters, itemsPerPageOptions } from '../services/constants'
import { composeSearchTerm, transformActiveFiltersToArray } from './helpers'

export const Context = createContext()

const Provider = ({ children, regionData: { searchTerm } }) => {
  const [activeFilters, setActiveFilters] = useState({
    ...initialActiveFilters,
    query: searchTerm
  })
  const [sortType, setSortType] = useState(sortOptions[0].name)
  const [resultsPerPage, setResultsPerPage] = useState(itemsPerPageOptions[0].name)
  const [currentPage, setCurrentPage] = useState(1)
  const [results, setResults] = useState({
    data: {
      items: [],
      itemsCount: 0,
      filters: []
    },
    isFetching: true,
    error: null
  })

  useEffect(() => {
    _search(searchTerm)
    return () => {
      _resetSearchResults()
    }
  }, [])

  useEffect(() => {
    setResults({...results, isFetching: true})
    const searchTerm = composeSearchTerm(activeFilters)
    _search(searchTerm)
  }, [activeFilters])

  const addFilter = category => filter => () => {
    setActiveFilters({
      ...activeFilters,
      [category]: [...activeFilters[category], filter]
    })
  }

  const removeFilter = category => filter => () => {
    const updatedCategory = activeFilters[category].filter(item => item !== filter)
    setActiveFilters({
      ...activeFilters,
      [category]: updatedCategory
    })
  }

  const _search = async (searchTerm) => {
    try {
      const response = await api.getSearchResults(searchTerm)
      if (isResponseOk(response.status)) {
        const { data } = response
        setResults({ data, isFetching: false, error: null })
      } else {
        setResults({ ...results, isFetching: false, error: response.error })
      }
    } catch (err) {
      setResults({ ...results.data, isFetching: false, error: err })
    }
  }

  const _resetSearchResults = () => setResults({ data: [], isFetching: false, error: null })

  const handleSearch = searchTerm => () => {
    setActiveFilters({
      ...initialActiveFilters,
      query: searchTerm
    })
    _search(searchTerm)
  }

  const activeFiltersAsArray = transformActiveFiltersToArray(activeFilters)

  const data = {
    activeFilters,
    activeFiltersAsArray,
    addFilter,
    removeFilter,
    currentPage,
    setCurrentPage,
    resultsPerPage,
    setResultsPerPage,
    sortType,
    setSortType,
    searchTerm,
    searchResults: results
  }

  return (
  <Context.Provider
    value={data}
  >
    <SearchBox
      initialValue={searchTerm}
      searchWatches={handleSearch}
    />
    {children}
  </Context.Provider>
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

