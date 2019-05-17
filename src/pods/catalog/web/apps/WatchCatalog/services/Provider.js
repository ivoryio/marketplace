import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { map } from 'rxjs/operators'
import { observe } from 'frint-react'

import api from '../../../services/catalog.dataservice'
import { isResponseOk } from '../../../services/helpers'
import { SearchBox } from '../components'
import { filters, sortOptions, initialActiveFilters, initialSearchResults, itemsPerPageOptions } from '../services/constants'
import { composeSearchTerm, makeSlices, transformActiveFiltersToArray, sortWatches } from './helpers'

export const DataContext = createContext()

const Provider = ({ children, regionData: { searchTerm } }) => {
  const [activeFilters, setActiveFilters] = useState({
    ...initialActiveFilters,
    query: searchTerm
  })
  const [sortType, setSortType] = useState(sortOptions[0].name)
  const [resultsPerPage, setResultsPerPage] = useState(itemsPerPageOptions[0].name)
  const [currentPage, setCurrentPage] = useState(1)
  const [results, setResults] = useState({
    ...initialSearchResults,
    isFetching: true
  })

  useEffect(() => {
    search(searchTerm)
    return () => {
      _resetSearchResults()
    }
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  },[resultsPerPage])

  useEffect(() => {
    const sortedItems = sortWatches(sortType, results.data.items)
    setResults({...results, data: { ...results.data, items: sortedItems }})
  }, [sortType])

  useEffect(() => {
    setResults({...results, isFetching: true})
    const searchTerm = composeSearchTerm(activeFilters)
    search(searchTerm)
    setCurrentPage(1)
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

  const search = async (searchTerm) => {
    try {
      const response = await api.getSearchResults(searchTerm)
      if (isResponseOk(response.status)) {
        const { data } = response
        const sortedItems = sortWatches(sortType, data.items)
        setResults({ data: {...data, items: sortedItems}, isFetching: false, error: null })
      } else {
        setResults({ ...results, isFetching: false, error: response.error })
      }
    } catch (err) {
      setResults({ ...results.data, isFetching: false, error: err })
    }
  }

  const _resetSearchResults = () => setResults(initialSearchResults)

  const activeFiltersAsArray = transformActiveFiltersToArray(activeFilters)
  const slicedWatches = makeSlices(results.data.items, Number(resultsPerPage))

  const { isFetching } = results

  const data = {
    activeFilters,
    activeFiltersAsArray,
    addFilter,
    removeFilter,
    currentPage,
    setCurrentPage,
    itemsCount: results.data.itemsCount,
    resultsPerPage,
    setResultsPerPage,
    sortType,
    setSortType,
    searchTerm: activeFilters.query,
    isFetching,
    filters,
    slicedWatches
  }
  return (
  <DataContext.Provider
    value={data}
  >
    <SearchBox
      initialValue={searchTerm}
      searchWatches={search}
      setActiveFilters={setActiveFilters}
    />
    {children}
  </DataContext.Provider>
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

