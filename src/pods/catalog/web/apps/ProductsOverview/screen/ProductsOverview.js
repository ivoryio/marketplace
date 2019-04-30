import React, { lazy, Suspense, useContext } from "react"
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

import { sortOptions, itemsPerPageOptions } from "../services/constants"
const LazyProductList = lazy(() => import("../components/ProductList"))

const ProductsOverview = () => {
  const context = useContext(Context)
  const {
    data: {
      activeFilters,
      activeFiltersAsArray,
      handleActiveFilters,
      currentPage,
      setCurrentPage,
      sortType,
      setSortType,
      resultsPerPage,
      setResultsPerPage,
      searchTerm,
      searchResults: {
        data: {
          items: watches,
          filters
        },
        isFetching
      }
    }
  } = context

  const _categoryProvenience = filter => {
    let result = null
    const filterCategories = Object.keys(activeFilters)
    filterCategories.forEach(category => {
      if(activeFilters[category].includes(filter)){
        result = category 
      }
    })
    return result
  }

  if (isFetching) {
    return <Typography textStyle='h2' textAlign='center'>Searching Watches...</Typography>
  }
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
                    {/* refactor, getKeys of object activeFilters,
                    forEach key render all elements from array(if exists)
                    also specify category to handler in each map */}

                    { activeFiltersAsArray.map(item => {
                      const category = _categoryProvenience(item)
                      return (
                      <Space my={1} key={`active-filter-${item}`}>
                        <ActiveFilter
                          title={item}
                          onClickIcon={handleActiveFilters(category)("pop", item)}
                        />
                      </Space>
                    )})}
                  </ActiveFiltersWrapper>
                </Space>
                  <Space mt={{ xs: 2, md: 4, lg: 0 }}>
                    <Flex width={1} flexWrap='wrap'>
                      { filters ? (
                        Object.keys(filters).map(categoryName => (
                          <FilterCategory
                            key={`${categoryName}-filter`}
                            name={categoryName}
                            options={filters[categoryName]}
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
              Browsing products for {searchTerm} - { watches.length } results
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
              <LazyProductList watches={watches} />
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
  )
}

const ActiveFiltersWrapper = styled(Flex)`
  & div:not(:first-child) {
    margin-left: ${themeGet("space.2")}px;
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

export default ProductsOverview
