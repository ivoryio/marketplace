import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { map } from 'rxjs/operators'
import { observe } from 'frint-react'

import api from '../../../services/catalog.dataservice'
import { SearchBox } from '../components'
import { sortOptions, initialActiveFilters, itemsPerPageOptions } from '../services/constants'

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
    data: [],
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
    const searchTerm = _composeSearchTerm(activeFilters)
    _search(searchTerm)

  }, [activeFilters])

  const _composeSearchTerm = activeFilters => {
    const { query, brands, models, genders  } = activeFilters
    const brandsTerm = brands.length !== 0 ? `&&brand=${brands.join()}` : ''
    const modelsTerm = models.length !== 0 ? `&&model=${models.join()}` : ''
    const gendersTerm = genders.length !== 0 ? `&&gender=${genders.join()}` : ''

    return `${query}${brandsTerm}${modelsTerm}${gendersTerm}`
  }

  const handleActiveFilters = category => (operation, filter) => () => {
    if (operation === 'push') {
      setActiveFilters({
        ...activeFilters,
        [category]: [...activeFilters[category], filter]
      })
    } else {
      let copy = {...activeFilters}
      copy[category].pop(filter)
      setActiveFilters(copy)
    }
  }

  const _search = async (searchTerm) => {
    try {
      const response = await api.getSearchResults(searchTerm)
      if (response.status === 200) {
        const { data } = response
        setResults({ data, isFetching: false, error: null })
      } else {
        setResults({ ...results, isFetching: false, error: response.error })
      }
    } catch (err) {
      setResults({ ...results.data, isFetching: false, error: err })
    }
  }

  const handleSearch = searchTerm => () => {
    //initial state for them a const
    setActiveFilters({
      ...initialActiveFilters,
      query: searchTerm
    })
    _search(searchTerm)
  }
  const _resetSearchResults = () => setResults({ data: [], isFetching: false, error: null })
  
  const transformActiveFiltersToArray = () => {
    const filterCategories = Object.keys(activeFilters).filter(category => category !== "query")
    let array = [activeFilters.query]
    filterCategories.forEach(category => {
      if (category.length !== 0) {
        array = [...array, ...activeFilters[category]]
      }
    })
    return array
  }

  const activeFiltersAsArray = transformActiveFiltersToArray()

  const data = {
    activeFilters,
    activeFiltersAsArray,
    handleActiveFilters,
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
    value={{data}}
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

