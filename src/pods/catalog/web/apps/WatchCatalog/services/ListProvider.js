import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../services/catalog.dataservice'
import { isResponseOk } from '../../../services/helpers'
import { composeSearchTerm, sortWatches } from './helpers'
import { transformActiveFiltersToArray } from '../services/helpers'
import { RootContext } from '../CatalogEntry'
import {
  filters,
  initialActiveFilters,
  initialSearchResults,
  itemsPerPageOptions
} from '../services/constants'

export const ListContext = createContext()
const ListProvider = ({
  children
}) => {
  const { filter, searchTerm, sortRule } = useContext(RootContext)
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
    ...initialSearchResults
  })

  useEffect(() => {
    if (sortRule) {
      setSortType(sortRule)
    }
  }, [sortRule])

  useEffect(() => {
    setActiveFilters(prevActive => ({ ...prevActive, query: searchTerm }))
  }, [searchTerm])

  const _setIsFetching = newStatus =>
    setResults(prevResults => ({ ...prevResults, isFetching: newStatus }))

  const _storeWatches = useCallback(data => {
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
      if (!filter && activeFilters.query === searchTerm) {
        try {
          _setIsFetching(true)
          setCurrentPage(1)
          setSortType(sortRule || '')
          const term = composeSearchTerm(activeFilters)
          const response = await api.getSearchResults(term)
          if (isResponseOk(response.status)) {
            _storeWatches(response.data)
          } else {
            _storeError(response.error)
          }
        } catch (err) {
          _storeError(err)
        }
      }
    },
    [_storeWatches, activeFilters, filter, sortRule]
  )

  useEffect(() => {
    if (filter && filter === 'spotlight' && activeFilters.query === searchTerm) {
      fetchSpotlightWatches()
    }
    async function fetchSpotlightWatches () {
      try {
        _setIsFetching(true)
        setCurrentPage(1)
        setSortType(sortRule || '')
        const spotlightFilters = { ...activeFilters, query: '' }
        const term = composeSearchTerm(spotlightFilters)
        const response = await api.getAllSpotlightWatches(term)
        if (isResponseOk(response.status)) {
          _storeWatches(response.data)
        } else {
          _storeError(response.error)
        }
      } catch (err) {
        _storeError(err)
      }
    }
  }, [_storeWatches, activeFilters, filter, searchTerm, sortRule])

  useEffect(() => {
    search(searchTerm)
    return () => {
      setResults(initialSearchResults)
    }
  }, [search, searchTerm])

  useEffect(() => {
    setCurrentPage(1)
  }, [resultsPerPage])

  const activeFiltersAsArray = transformActiveFiltersToArray(activeFilters)

  const {
    isFetching,
    data: { items, itemsCount }
  } = results
  return (
    <ListContext.Provider
      value={{
        activeFilters,
        activeFiltersAsArray,
        currentPage,
        filters,
        isFetching,
        watches: items,
        itemsCount,
        resultsPerPage,
        searchTerm: activeFilters.query,
        setActiveFilters,
        setCurrentPage,
        setResultsPerPage,
        setSortType,
        sortType
      }}>
      {children}
    </ListContext.Provider>
  )
}

ListProvider.propTypes = {
  children: PropTypes.node
}

export default ListProvider
