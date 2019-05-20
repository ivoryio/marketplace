import React, { createContext, useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { map } from 'rxjs/operators'
import { observe } from 'frint-react'

import api from '../../../services/catalog.dataservice'
import { isResponseOk } from '../../../services/helpers'
import { SearchBox } from '../components'
import {
  filters,
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

const Provider = ({
  children,
  regionData: { filter, searchTerm, sortRule, source }
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState(sortRule || '')
  const [activeFilters, setActiveFilters] = useState({
    ...initialActiveFilters,
    query: searchTerm
  })
  const [resultsPerPage, setResultsPerPage] = useState(
    itemsPerPageOptions[0].name
  )
  const [results, setResults] = useState({
    ...initialSearchResults,
    isFetching: true
  })

  useEffect(() => {
    setActiveFilters(prevActive => ({ ...prevActive, query: searchTerm }))
  }, [searchTerm])

  const _storeData = useCallback(data => {
    setResults({
      data,
      isFetching: false,
      error: null
    })
  }, [])

  const _storeError = error => {
    setResults(results => ({
      ...results,
      isFetching: false,
      error
    }))
  }

  useEffect(() => {
    setResults(prevResults => ({
      ...prevResults,
      data: {
        ...prevResults.data,
        items: sortWatches(sortType, prevResults.data.items)
      }
    }))
  }, [sortType])

  const search = useCallback(
    async searchTerm => {
      if (!filter) {
        try {
          setCurrentPage(1)
          const term = composeSearchTerm(activeFilters)
          const response = await api.getSearchResults(term)
          if (isResponseOk(response.status)) {
            const { data } = response
            _storeData(data)
          } else {
            _storeError(response.error)
          }
        } catch (err) {
          _storeError(err)
        }
      }
    },
    [_storeData, activeFilters, filter]
  )

  useEffect(() => {
    if (filter && filter === 'spotlight') {
      fetchSpotlightWatches()
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
