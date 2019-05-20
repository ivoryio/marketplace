import React, { lazy, Suspense, useContext } from 'react'
import { Hub } from '@aws-amplify/core'
import styled from 'styled-components'

import {
  Box,
  Dropdown,
  Flex,
  Option,
  Space,
  themeGet,
  Typography
} from '@ivoryio/kogaio'

import { BackButton, Pagination, FilterSection } from '../components'

import { DataContext } from '../services/Provider'
import { NavigationContext } from '../WatchCatalogEntry'

import { sortOptions, itemsPerPageOptions } from '../services/constants'
const LazyProductList = lazy(() => import('../components/ProductList'))

const WatchList = () => {
  const {
    currentPage,
    slicedWatches,
    sortType,
    setSortType,
    resultsPerPage,
    setResultsPerPage,
    searchTerm,
    isFetching,
    itemsCount
  } = useContext(DataContext)

  const { currentScreen } = useContext(NavigationContext)
  const maxPages = slicedWatches.length

  const _goBack = () =>
    Hub.dispatch(
      'TransitionChannel',
      {
        event: 'goBack',
        message: `Request to goBack`
      },
      'WatchList'
    )

  if (!currentScreen.includes('watch-list')) {
    return null
  }
  return (
    <Flex flexWrap='wrap'>
      <Space mt={{ xs: 4, lg: 10 }} pl={{ xs: 4, lg: 6 }} pr={{ xs: 4, lg: 0 }}>
        <Box width={{ xs: 1, lg: 1 / 4 }}>
          <FilterSection />
        </Box>
      </Space>
      <Space mt={{ lg: 10 }}>
        <Flex width={{ xs: 1, lg: 3 / 4 }} flexWrap='wrap'>
          <Space
            mt={{ xs: 4, md: 6, lg: 0 }}
            pl={{ xs: 4, lg: 6 }}
            pr={{ xs: 4, md: 24, lg: 6 }}>
            <Flex width={1}>
              <BackButton onClick={_goBack} />
            </Flex>
            <Typography color='gunmetal' variant='h1'>
              Browsing products {searchTerm ? `for "${searchTerm}"` : null}{' '}
              {itemsCount ? `- ${itemsCount} results` : null}
            </Typography>
          </Space>
          <Space mt={{ xs: 4, md: 6 }} px={{ xs: 2, lg: 6 }}>
            <Flex width={1}>
              <Space mx={{ xs: 2, lg: 0 }}>
                <Box width={{ xs: 1 / 2, sm: 1 / 3, md: 1 / 4 }}>
                  <Dropdown
                    id='sort-dropdown'
                    label='Sort by'
                    onChange={setSortType}
                    value={sortType}
                    width={1}>
                    {sortOptions.map(option => (
                      <Option key={option.id} value={option.name}>
                        {option.name}
                      </Option>
                    ))}
                  </Dropdown>
                </Box>
              </Space>
              <Space ml={{ xs: 2, lg: 4 }} mr={{ xs: 2, lg: 0 }}>
                <Box width={{ xs: 1 / 2, sm: 1 / 3, md: 1 / 4 }}>
                  <Dropdown
                    id='results-per-page-dropdown'
                    label='Results per page'
                    onChange={setResultsPerPage}
                    value={resultsPerPage}
                    width={1}>
                    {itemsPerPageOptions.map(option => (
                      <Option key={option.id} value={option.name}>
                        {option.name}
                      </Option>
                    ))}
                  </Dropdown>
                </Box>
              </Space>
            </Flex>
          </Space>
          <Space mt={{ xs: 3, md: 6, lg: 4 }} px={{ xs: 2, lg: 3 }}>
            <Suspense fallback={<div>Loading...</div>}>
              <LazyProductList
                watches={slicedWatches[currentPage - 1]}
                isFetching={isFetching}
              />
            </Suspense>
          </Space>
          <Space px={{ md: 4, lg: 6 }} mt={{ xs: 6, md: 4 }}>
            <Flex
              width={1}
              flexDirection='row'
              alignItems='center'
              flexWrap='wrap'>
              <Space pl={{ md: 1, lg: 0 }}>
                <Flex
                  width={{ xs: 1, md: 1 / 3 }}
                  alignItems='center'
                  justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  <Typography color='gunmetal' fontSize={1}>
                    Results per page
                  </Typography>
                  <Space ml={{ xs: 2, md: 3 }}>
                    <Dropdown
                      id='results-per-page-dropdown-2'
                      onChange={setResultsPerPage}
                      value={resultsPerPage}
                      width='73px'>
                      {itemsPerPageOptions.map(option => (
                        <Option key={option.id} value={option.name}>
                          {option.name}
                        </Option>
                      ))}
                    </Dropdown>
                  </Space>
                </Flex>
              </Space>
              <Flex
                width={{ xs: 1, md: 2 / 3 }}
                alignItems='center'
                justifyContent={{
                  xs: 'center',
                  md: 'space-between',
                  lg: 'flex-end'
                }}
                flexWrap='wrap'>
                <Space mt={{ xs: 6, md: 0 }}>
                  <PaginationDescription color='pastel-blue' fontSize={1}>
                    Showing
                    <Space px={1}>
                      <Typography
                        color='pastel-blue'
                        fontSize={1}
                        fontWeight={2}>
                        {(currentPage - 1) * resultsPerPage + 1}-
                        {currentPage === maxPages
                          ? itemsCount
                          : currentPage * resultsPerPage}
                      </Typography>
                    </Space>
                    of
                    <Space px={1}>
                      <Typography
                        color='pastel-blue'
                        fontSize={1}
                        fontWeight={2}>
                        {itemsCount}
                      </Typography>
                    </Space>
                    results
                  </PaginationDescription>
                </Space>
                <Space mt={{ xs: 3, md: 0 }} ml={{ lg: 6 }}>
                  <PaginationWrapper
                    width={{ xs: 1, md: 'auto' }}
                    justifyContent={{ xs: 'center', md: 'flex-end' }}>
                    <Pagination maxPages={maxPages} />
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

const PaginationDescription = styled(Typography)`
  display: flex;
  flexdirection: row;
  alignself: center;
`

const PaginationWrapper = styled(Flex)`
  & button:not(:last-child) {
    margin-right: ${themeGet('space.2')}px;
  }
`

export default WatchList
