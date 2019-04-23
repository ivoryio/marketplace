import React, { lazy, Suspense, useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { map } from "rxjs/operators"
import { observe } from "frint-react"

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
} from "./components"

import api from '../../services/catalog.dataservice'
import { categoryFilters, sortOptions, itemsPerPageOptions } from "./services/constants"
const LazyProductList = lazy(() => import("./components/ProductList"))

const ProductsOverview = ({ regionData: { searchTerm } }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0].name)
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].name)
  const [activeFilters, setActiveFilters] = useState([
    "Sport Watches",
    "Luxury Watches"
  ])
  const [results, setResults] = useState({
    data: [],
    isFetching: true,
    error: null
  })
  useEffect(() => {
    _search()
    return _resetSearchResults
  }, [])

  const handleActiveFilters = (operation, filter) => () => {
    if (operation === 'push') {
      setActiveFilters([...activeFilters, filter ])
    } else {
      let updatedActiveFilters = [...activeFilters].filter(item => item !== filter)
      setActiveFilters(updatedActiveFilters)
    }
  }

  const _search = async () => {
    try {
      const response = await api.getSearchResults(searchTerm)
      if (response.status === 200) {
        setResults({ data: response.data.items, isFetching: false, error: null })
      } else {
        setResults({ ...results, isFetching: false, error: response.error })
      }
    } catch (err) {
      console.error("* Error caught in _search", err)
      setResults({ ...results.data, isFetching: false, error: err })
    }
  }
  const _resetSearchResults = () => setResults({ data: [], isFetching: false, error: null })

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
                <Flex width={{ xs: 1, md: "auto" }} alignItems='center'>
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
                    {activeFilters.map(item => (
                      <Space my={1} key={`active-filter-${item}`}>
                        <ActiveFilter
                          title={item}
                          onClickIcon={handleActiveFilters("pop", item)}
                        />
                      </Space>
                    ))}
                  </ActiveFiltersWrapper>
                </Space>
                  <Space mt={{ xs: 2, md: 4, lg: 0 }}>
                    <Flex width={1} flexWrap='wrap'>
                      {categoryFilters.map(category => {
                        const { name, options } = category
                        return (
                        <FilterCategory
                          key={`${category}-filter`}
                          options={options}
                          name={name}
                          handleActiveFilters={handleActiveFilters}
                        />
                      )})}
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
              Browsing products for {searchTerm} - 300 results
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
                    onChangeOption={setSelectedSort}
                    options={sortOptions}
                    selectedOption={selectedSort}
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
                    onChangeOption={setItemsPerPage}
                    options={itemsPerPageOptions}
                    selectedOption={itemsPerPage}
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
                      onChangeOption={setItemsPerPage}
                      options={itemsPerPageOptions}
                      selectedOption={itemsPerPage}
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
                    Showing {itemsPerPage} of 300 results
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

const ObservedProductsOverview = observe((app, props$) => {
  const region = app.get("region")
  const regionData$ = region
    .getData$()
    .pipe(map(regionData => ({ regionData })))
  return regionData$
})(ProductsOverview)

ProductsOverview.propTypes = {
  regionData: PropTypes.object
}

export default ObservedProductsOverview
