import React, { lazy, Suspense, useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import {
  Box,
  Dropdown,
  Flex,
  Hide,
  Icon,
  Space,
  themeGet,
  Typography
} from "@ivoryio/kogaio"

import {
  ActiveFilter,
  FilterCategory,
  Pagination
} from "../components"
import { Context } from '../services/Provider'

import api from '../../../services/catalog.dataservice'
import { sortOptions, itemsPerPageOptions } from "../services/constants"
const LazyProductList = lazy(() => import("../components/ProductList"))

const ProductsOverview = ({ srcTerm }) => {
  const [searchTerm, setSearchTerm] = useState(srcTerm)
  const [currentPage, setCurrentPage] = useState(1)
  const [results, setResults] = useState({
    data: [],
    isFetching: true,
    error: null
  })

  useEffect(() => {
    _search(searchTerm)
    window.addEventListener('searchWatches', handleSearchEvents)
    return () => {
      _resetSearchResults()
      window.removeEventListener('searchWatches', handleSearchEvents)
    }
  }, [])

  const _search = async (searchTerm) => {
    try {
      const response = await api.getSearchResults(searchTerm)
      if (response.status === 200) {
        const { data: { items, filters } } = response
        setResults({ data: items, filters, isFetching: false, error: null })
      } else {
        setResults({ ...results, isFetching: false, error: response.error })
      }
    } catch (err) {
      setResults({ ...results.data, isFetching: false, error: err })
    }
  }

  const handleSearchEvents = event => {
    const { detail: { searchTerm } } = event
    setSearchTerm(searchTerm)
    _search(searchTerm)
  }
  const _resetSearchResults = () => setResults({ data: [], isFetching: false, error: null })
  return (
    <Context.Consumer>
      { context => {
        const {
          data: {
            activeFilters,
            handleActiveFilters,
            sortType,
            setSortType,
            resultsPerPage,
            setResultsPerPage
          }
        } = context
        return (
          <Flex flexWrap='wrap'>
            <Space mt={{ xs: 4, lg: 10 }} pl={{ xs: 4, lg: 6 }} pr={{ xs: 4, lg: 0 }}>
              <Box width={{ xs: 1, lg: 1 / 4 }}>
                <Space p={4}>
                  <FilterSection width={1} bg='ghost-white' flexDirection='column'>
                    <Space py={{ lg: 2 }}>
                    <Flex
                      width={1}
                      alignItems='center'
                      flexWrap='wrap'
                      justifyContent={{ xs: "space-between", lg: "flex-start" }}
                    >
                      <Flex width={1} alignItems='center'>
                        <Hide lg xlg>
                          <Icon name='filter_list' fontSize={3} />
                        </Hide>
                        <Space ml={3}>
                          <Typography color='gunmetal' fontSize={0} fontWeight={2}>
                            FILTER RESULTS
                          </Typography>
                        </Space>
                      </Flex>
                      <Space>
                        <ActiveFiltersWrapper
                          width={1}
                          flexWrap='wrap'
                          mt={{ xs: 2, md: 0, lg: 3 }}
                        >
                          {activeFilters.length !== 0 ? activeFilters.map(item => (
                            <Space my={1} key={`active-filter-${item}`}>
                              <ActiveFilter
                                title={item}
                                onClickIcon={handleActiveFilters("pop", item)}
                              />
                            </Space>
                          )) : null}
                        </ActiveFiltersWrapper>
                      </Space>
                        <Space mt={{ xs: 2, md: 4, lg: 0 }}>
                          <Flex width={1} flexWrap='wrap'>
                            { results.filters ? (
                              Object.keys(results.filters).map(categoryName => (
                                <FilterCategory
                                  key={`${categoryName}-filter`}
                                  name={categoryName}
                                  options={results.filters[categoryName]}
                                />
                              ))) : null
                            }
                          </Flex>
                        </Space>
                    </Flex>
                    </Space>
                  </FilterSection>
                </Space>
              </Box>
            </Space> 
            <Space mt={{ lg: 10 }}>
              <Flex width={{ xs: 1, lg: 3 / 4 }} flexWrap='wrap'>
                <Space
                  mt={{ xs: 4, md: 6, lg: 0 }}
                  pl={{ xs: 4, lg: 6 }}
                  pr={{ xs: 4, md: 24, lg: 6 }}
                >
                  <Typography color='gunmetal' variant='h1'>
                    Browsing products for {searchTerm} - { results.data.length } results
                  </Typography>
                </Space>
                <Space mt={{ xs: 4, md: 6 }} px={{ xs: 2, lg: 6 }}>
                  <Flex width={1}>
                    <Space mx={{ xs: 2, lg: 0 }}>
                      <Box width={{ xs: 1 / 2, sm: 1 / 3, md: 1 / 4 }}>
                        <Dropdown
                          colors='dropdown-white'
                          id='sort-by'
                          label='Sort by'
                          onChangeOption={setSortType}
                          options={sortOptions}
                          selectedOption={sortType}
                          width={1}
                        />
                      </Box>
                    </Space>
                    <Space ml={{ xs: 2, lg: 4 }} mr={{ xs: 2, lg: 0 }}>
                      <Box width={{ xs: 1 / 2, sm: 1 / 3, md: 1 / 4 }}>
                        <Dropdown
                          colors='dropdown-white'
                          id='results-per-page'
                          label='Results per page'
                          onChangeOption={setResultsPerPage}
                          options={itemsPerPageOptions}
                          selectedOption={resultsPerPage}
                          width={1}
                        />
                      </Box>
                    </Space>
                  </Flex>
                </Space>
                <Space mt={{ xs: 3, md: 6, lg: 4 }} px={{ xs: 2, lg: 3 }}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <LazyProductList watches={results.data} />
                  </Suspense>
                </Space>
                <Space px={{ md: 4, lg: 6 }} mt={{ xs: 6, md: 4 }}>
                  <Flex
                    width={1}
                    flexDirection='row'
                    alignItems='center'
                    flexWrap='wrap'
                  >
                    <Space pl={{ md: 1, lg: 0 }}>
                      <Flex
                        width={{ xs: 1, md: 1 / 3 }}
                        alignItems='center'
                        justifyContent={{ xs: 'center', md: 'flex-start' }}
                      >
                        <Typography color='gunmetal' fontSize={1}>
                          Results per page
                        </Typography>
                        <Space ml={{ xs: 2, md: 3 }}>
                          <Dropdown
                            colors='dropdown-white'
                            id='results-per-page1'
                            onChangeOption={setResultsPerPage}
                            options={itemsPerPageOptions}
                            selectedOption={resultsPerPage}
                            width='73px'
                          />
                        </Space>
                      </Flex>
                    </Space>
                    <Flex
                      width={{ xs: 1, md: 2 / 3 }}
                      alignItems='center'
                      justifyContent={{ xs: 'center', md: 'space-between', lg: 'flex-end'}}
                      flexWrap='wrap'
                    >
                      <Space mt={{ xs: 6, md: 0 }}>
                        <Typography
                          alignSelf='center'
                          color='pastel-blue'
                          fontSize={1}
                        >
                          Showing {resultsPerPage} of 300 results
                        </Typography>
                      </Space>
                      <Space mt={{ xs: 3, md: 0 }} ml={{ lg: 6 }}>
                        <PaginationWrapper
                          width={{ xs: 1, md: "auto" }}
                          justifyContent={{ xs: "center", md: "flex-end" }}
                        >
                          <Pagination
                            currPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </PaginationWrapper>
                      </Space>
                    </Flex>
                  </Flex>
                </Space>
              </Flex>
            </Space>
          </Flex>
        )}}
    </Context.Consumer>
  )
}

const ActiveFiltersWrapper = styled(Flex)`
  & div:not(:last-child) {
    margin-right: ${themeGet("space.2")}px;
  }
`

const FilterSection = styled(Flex)`
  border: ${themeGet("borders.1")} ${themeGet("colors.pastel-blue")};
`

const PaginationWrapper = styled(Flex)`
  & button:not(:last-child) {
    margin-right: ${themeGet("space.2")}px;
  }
`

ProductsOverview.propTypes = {
  srcTerm: PropTypes.string
}

export default ProductsOverview
