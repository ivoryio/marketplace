import React, { lazy, Suspense, useState } from "react"
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

import { watches } from "./data.mock"
import {
  ActiveFilter,
  FilterCategory,
  Pagination,
  SearchBox
} from "./components"

import { sortOptions, itemsPerPageOptions } from "./services/constants"
const LazyProductList = lazy(() => import("./components/ProductList"))

const activeFilters = ["Sports Watches", "Luxury Watches"]
const categoryFilters = [
  {
    name: "Brand",
    options: [
      { title: "Rolex", numberOfProducts: 13 },
      { title: "Tissot", numberOfProducts: 8 }
    ]
  },
  {
    name: "Model",
    options: [
      { title: "SkyWalker", numberOfProducts: 3 },
      { title: "Day-Time", numberOfProducts: 6 }
    ]
}
]
const ProductsOverview = ({ regionData: { searchTerm } }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0].name)
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].name)
  const [activeFilterCategories, setActiveFilterCategories] = useState({
    brand: [],
    model: [],
    gender: []
  })

  const handleActiveFilterCategories = (key, value) => () => {
    setActiveFilterCategories({
      ...activeFilterCategories,
      [key]: [...activeFilterCategories[key], value]
    })
  }

  return (
    <Flex flexWrap='wrap'>
      <Space mt={3} px={{ xs: 4, lg: 378 }}>
        <SearchBox initialValue={searchTerm} />
      </Space>
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
                    flexWrap='wrap'
                    mt={{ xs: 2, md: 0, lg: 3 }}
                  >
                    {activeFilters.map(item => (
                      <Space my={1} key={item}>
                        <ActiveFilter title={item} onClickIcon={() => {}} />
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
                        handleActiveFilterCategories={
                          handleActiveFilterCategories
                        }
                        name={name}
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
              <LazyProductList watches={watches} />
            </Suspense>
          </Space>
          <Space px={{ md: 4, lg: 6 }} mt={{ xs: 6, md: 4 }}>
            <Flex
              width={1}
              flexDirection='row'
              alignItems='center'
              justifyContent={{ xs: "center", md: "space-between" }}
              flexWrap='wrap'
            >
              <Space ml={{ md: 1, lg: 0 }}>
                <Flex alignItems='center'>
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
              <Flex alignItems='center' justifyContent='center' flexWrap='wrap'>
                <Space mt={{ xs: 6, md: 0 }}>
                  <Typography
                    alignSelf='center'
                    color='pastel-blue'
                    fontSize={1}
                  >
                    Showing {itemsPerPage} of 300 results
                  </Typography>
                </Space>
                <Space mt={{ xs: 3, md: 0 }} ml={{ md: 6 }}>
                  <PaginationWrapper
                    width={{ xs: 1, sm: "auto" }}
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
