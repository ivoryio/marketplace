import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { map } from "rxjs/operators"
import { observe } from "frint-react"

import {
  Box,
  Button,
  Dropdown,
  Flex,
  Hide,
  Icon,
  Input,
  Space,
  themeGet,
  Typography
} from "@ivoryio/kogaio"

import { ActiveFilter, FilterCategory, ProductCard, SquaredBox } from "./components"
import { watches } from "./data.mock"
//import api from "../../services/catalog.dataservice"

const activeFilters = ["Rolex", "Sports Watches", "Luxury Watches"]
const options = [
  {
    id: "option1",
    name: "25"
  },
  {
    id: "option2",
    name: "50"
  },
  {
    id: "option3",
    name: "100"
  }
]

const ResultsPagination = ({ currPage, handleCurrentPage }) => (
  <Fragment>
    <SquaredBox onClick={handleCurrentPage(currPage - 1)}>
      <Icon color='pastel-blue' fontSize={1} name='arrow_back' />
    </SquaredBox>
    <SquaredBox bg='green'>
      <Typography color='pastel-blue' fontSize={1}>
        {currPage}
      </Typography>
    </SquaredBox>
    <SquaredBox onClick={handleCurrentPage(currPage + 1)}>
      <Typography color='pastel-blue' fontSize={1}>
        {currPage + 1}
      </Typography>
    </SquaredBox>
    <SquaredBox>
      <Typography color='pastel-blue' fontSize={1}>
        ...
      </Typography>
    </SquaredBox>
    <SquaredBox>
      <Typography color='pastel-blue' fontSize={1}>
        50
      </Typography>
    </SquaredBox>
    <SquaredBox onClick={handleCurrentPage(currPage + 1)}>
      <Icon color='pastel-blue' fontSize={1} name='arrow_forward' />
    </SquaredBox>
  </Fragment>
)

const ProductsOverview = ({ regionData: { searchTerm } }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState("")
  const [selectedPageResults, setSelectedPageResults] = useState("25")
  const [selectedSort, setSelectedSort] = useState("Newest entries")
  const [ activeFilterCategories, setActiveFilterCategories ] = useState({
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

  const handleCurrentPage = pageNumber => () => setCurrentPage(pageNumber)
  const handleSearchValChange = ev => {
    ev.preventDefault()
    setSearchValue(ev.target.value)
  }

  return (
    <Flex flexDirection='row' flexWrap='wrap'>
      <Space mt={3} px={{ xs: 4, lg: 378 }}>
        <Flex
          width={1}
          bg='ghost-white'
          alignItems='center'
          justifyContent='center'
        >
          <Space pt={6} pb='2px' pr={{ xs: 0, lg: 2 }}>
            <Box width={{ xs: 1, lg: 8 / 10 }}>
              <Input
                placeholder='Value'
                onChange={handleSearchValChange}
                name='search'
                value={searchValue}
              />
            </Box>
          </Space>
          <Hide lg xlg>
            <Flex
              alignItems='center'
              justifyContent='center'
              bg='brand'
              width='36px'
              height='36px'
            >
              <Icon fontSize={3} name='search' />
            </Flex>
          </Hide>
          <Hide xs sm md>
            <Button
              width={2 / 10}
              fontSize={0}
              onClick={() => {}}
              variant='primary'
              title='Search'
            />
          </Hide>
        </Flex>
      </Space>
      <Space mt={{ xs: 4, lg: 10 }} pl={{ xs: 4, lg: 6 }} pr={{ xs: 4, lg: 0 }}>
        <Box width={{ xs: 1, lg: 1 / 4 }}>
          <Space p={4}>
            <FilterSection width={1} bg='ghost-white' flexDirection='column'>
              <Flex
                width={1}
                alignItems='center'
                flexWrap='wrap'
                justifyContent={{ xs: 'space-between', lg: 'flex-start'}}
              >
                <Flex width={{ xs: 1, md: 'auto' }} alignItems='center'>
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
                  <ActiveFiltersWrapper flexWrap='wrap' mt={{ xs: 2, md: 0, lg: 3 }}>
                    {activeFilters.map(item => (
                      <Space my={1} key={item}>
                        <ActiveFilter title={item} onClickIcon={() => {}} />
                      </Space>
                    ))}
                  </ActiveFiltersWrapper>
                </Space>
                <Space mt={{ xs: 4, md: 6 }}>
                  <Flex width={1}>
                    <FilterCategory
                      options={[{ title: 'Rolex', numberOfProducts: 13 }, { title: 'Tissot', numberOfProducts: 8 }]}
                      handleActiveFilterCategories={handleActiveFilterCategories}
                      name='Brand'
                    />
                  </Flex>
                </Space>
              </Flex>
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
            <Typography color='gunmetal' textStyle='h1'>
              Browsing products for Rolex - 300 results
            </Typography>
          </Space>
          <Space mt={{ xs: 4, md: 6 }} px={{ xs: 2, lg: 6 }}>
            <Flex pt={{ xs: 0, lg: 1 }} width={1}>
              <Space mx={{ xs: 2, lg: 0 }}>
                <Dropdown
                  colors='dropdown-white'
                  id='sort-by'
                  label='Sort by'
                  onChangeOption={setSelectedSort}
                  options={options}
                  selectedOption={selectedSort}
                  width={{ xs: 1 / 2, md: 149 }}
                />
              </Space>
              <Space ml={{ xs: 2, lg: 4 }} mr={{ xs: 2, lg: 0 }}>
                <Dropdown
                  colors='dropdown-white'
                  id='results-per-page'
                  label='Results per page'
                  onChangeOption={setSelectedPageResults}
                  options={options}
                  selectedOption={selectedPageResults}
                  width={{ xs: 1 / 2, md: 149 }}
                />
              </Space>
            </Flex>
          </Space>
          <Space mt={{ xs: 3, md: 6, lg: 4 }} px={{ xs: 2, lg: 3 }}>
            <Flex width={1} flexWrap='wrap' justifyContent='center'>
              {watches.map(watch => {
                const { id, imgSrc, price, title } = watch
                return (
                  <Space key={id} pb={{ xs: 4, lg: 6 }} px={{ xs: 2, lg: 3 }}>
                    <Box width={{ xs: 1, md: 1 / 2, lg: 1 / 3 }}>
                      <ProductCard
                        imgSrc={imgSrc}
                        price={price}
                        title={title}
                      />
                    </Box>
                  </Space>
                )
              })}
            </Flex>
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
                      onChangeOption={setSelectedPageResults}
                      options={options}
                      selectedOption={selectedPageResults}
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
                    Showing 25 of 300 results
                  </Typography>
                </Space>
                <Space mt={{ xs: 3, md: 0 }} ml={{ md: 6 }}>
                  <PaginationWrapper
                    width={{ xs: 1, sm: "auto" }}
                    justifyContent={{ xs: "center", md: "flex-end" }}
                  >
                    <ResultsPagination
                      currPage={currentPage}
                      handleCurrentPage={handleCurrentPage}
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

ResultsPagination.propTypes = {
  currPage: PropTypes.number,
  handleCurrentPage: PropTypes.func
}

ProductsOverview.propTypes = {
  regionData: PropTypes.object
}

export default ObservedProductsOverview
