import React, { createContext, useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { map } from 'rxjs/operators'
import { observe } from 'frint-react'

import { SearchBox } from '../components'

import api from '../../../services/catalog.dataservice'
import { isResponseOk } from '../../../services/helpers'
import { composeSearchTerm, sortWatches } from './helpers'
import { transformActiveFiltersToArray } from '../services/helpers'
import {
  filters,
  initialActiveFilters,
  initialSearchResults,
  itemsPerPageOptions
} from '../services/constants'

const INITIAL_DETAILS = {
  data: {},
  isFetching: true,
  error: null
}
export const DataContext = createContext()
const DataProvider = ({
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
  const [selectedWatch, setSelectedWatch] = useState('')
  const [details, setWatchDetails] = useState(INITIAL_DETAILS)

  useEffect(() => {
    if (sortRule) {
      setSortType(sortRule)
    }
  }, [sortRule])

  useEffect(() => {
    setActiveFilters(prevActive => ({ ...prevActive, query: searchTerm }))
  }, [searchTerm])

  const _setFetchingList = newStatus =>
    setResults(prevResults => ({ ...prevResults, isFetching: newStatus }))

  const _storeWatches = useCallback(data => {
    setResults({
      data,
      isFetching: false,
      error: null
    })
  }, [])

  const _storeFetchListError = error => {
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
          _setFetchingList(true)
          setCurrentPage(1)
          setSortType(sortRule || '')
          const term = composeSearchTerm(activeFilters)
          const response = await api.getSearchResults(term)
          if (isResponseOk(response.status)) {
            _storeWatches(response.data)
          } else {
            _storeFetchListError(response.error)
          }
        } catch (err) {
          _storeFetchListError(err)
        } finally {
          _setFetchingList(false)
        }
      }
    },
    [_storeWatches, activeFilters, filter, sortRule]
  )

  useEffect(() => {
    if (filter && filter === 'spotlight') {
      fetchSpotlightWatches()
    }
    async function fetchSpotlightWatches () {
      try {
        const response = await api.getSpotlightWatches()
        if (isResponseOk(response.status)) {
          _storeWatches(response.data)
        } else {
          _storeFetchListError(response.error)
        }
      } catch (err) {
        _storeFetchListError(err)
      }
    }
  }, [_storeWatches, filter])

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

  const selectWatch = watchId => setSelectedWatch(watchId)

  const setIsFetchingDetails = status =>
    setWatchDetails(prevDetails => ({ ...prevDetails, isFetching: status }))

  const storeDetails = details =>
    setWatchDetails(prevDetails => ({
      ...prevDetails,
      data: details,
      isFetching: false
    }))
  const storeDetailsError = err =>
    setWatchDetails(prevDetails => ({
      ...prevDetails,
      isFetching: false,
      error: err
    }))
  const clearDetails = () => setWatchDetails(INITIAL_DETAILS)

  const {
    isFetching,
    data: { items, itemsCount }
  } = results
  const {
    data: { imgList },
    isFetching: isFetchingDetails
  } = details
  return (
    <DataContext.Provider
      value={{
        watchList: {
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
        },
        watchDetails: {
          imgList,
          isFetchingDetails,
          selectedWatch,
          setIsFetchingDetails,
          storeDetails,
          storeDetailsError,
          details: details.data
        },
        selectWatch,
        clearDetails
      }}>
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
})(DataProvider)

ObservedProvider.propTypes = {
  regionData: PropTypes.object
}

DataProvider.propTypes = {
  children: PropTypes.node,
  regionData: PropTypes.object
}

export default ObservedProvider
