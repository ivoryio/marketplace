import React, { createContext, useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { map } from 'rxjs/operators'
import { observe } from 'frint-react'

import api from '../../../services/catalog.dataservice'
import { isResponseOk } from '../../../services/helpers'
import { SearchBox } from '../components'
import {
  filters,
  sortOptions,
  initialActiveFilters,
  initialSearchResults,
  itemsPerPageOptions
} from '../services/constants'
import {
  composeSearchTerm,
  makeSlices,
  transformActiveFiltersToArray,
  sortWatches
} from './helpers'

export const DataContext = createContext()

const Provider = ({ children, regionData: { filter, searchTerm, sortRule = sortOptions[0].name, source } }) => {
  const [activeFilters, setActiveFilters] = useState({
    ...initialActiveFilters,
    query: searchTerm
  })
  const [sortType, setSortType] = useState(sortRule)
  const [resultsPerPage, setResultsPerPage] = useState(
    itemsPerPageOptions[0].name
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [results, setResults] = useState({
    ...initialSearchResults,
    isFetching: true
  })

  useEffect(() => {
    setActiveFilters(prevActive => ({ ...prevActive, query: searchTerm }))
  }, [searchTerm])
  useEffect(() => { setSortType(sortRule) }, [sortRule])

  const _storeData = useCallback(data => {
    const { items } = data
    const sortedItems = sortWatches(sortType, items)

    setResults({
      data: { ...data, items: sortedItems },
      isFetching: false,
      error: null
    })
  }, [sortType])

  const _storeError = error => {
    setResults(results => ({
      ...results,
      isFetching: false,
      error
    }))
  }

  const search = useCallback(
    async searchTerm => {
      try {
        const response = await api.getSearchResults(searchTerm)
        if (isResponseOk(response.status)) {
          const { data } = response
          _storeData(data)
        } else {
          _storeError(response.error)
        }
      } catch (err) {
        _storeError(err)
      }
    },
    [_storeData]
  )

  useEffect(() => {
    if (filter) {
      if (filter === 'spotlight') {
        fetchSpotlightWatches()
      }
    }
    async function fetchSpotlightWatches () {
      try {
        const response = await api.getSpotlightWatches()
        if (isResponseOk(response.status)) {
          _storeData(response.data)
        } else {
          _storeError(response.error)
        }
      } catch (err) {
        _storeError(err)
      } 
    }
  }, [_storeData, filter])

  useEffect(() => {
    search(searchTerm)
    return () => {
      setResults(initialSearchResults)
    }
  }, [search, searchTerm])

  useEffect(() => {
    setCurrentPage(1)
  }, [resultsPerPage])

  useEffect(() => {
    setResults(results => ({ ...results, isFetching: true }))
    const searchTerm = composeSearchTerm(activeFilters)
    search(searchTerm)
    setCurrentPage(1)
  }, [activeFilters, search])

  const addFilter = category => filter => () =>
    setActiveFilters({
      ...activeFilters,
      [category]: [...activeFilters[category], filter]
    })

  const removeFilter = category => filter => () => {
    const updatedCategory = activeFilters[category].filter(
      item => item !== filter
    )
    setActiveFilters({
      ...activeFilters,
      [category]: updatedCategory
    })
  }

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
    <DataContext.Provider value={data}>
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
