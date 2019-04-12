import React, { useState } from "react"
import PropTypes from "prop-types"
//import styled from "styled-components"
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
  Typography
} from "@ivoryio/kogaio"

import { ProductCard } from './components'
import { watches } from './data.mock'
//import ActivityIndicator from "@ivoryio/kogaio/ActivityIndicator"

//import api from "../../services/catalog.dataservice"

const options = [
  {
    id: "option1",
    name: "Option 1"
  },
  {
    id: "option2",
    name: "Option 2"
  },
  {
    id: "option3",
    name: "Option 3"
  }
]

const SearchResults = ({ regionData: { searchTerm } }) => {
  const [searchValue, setSearchValue] = useState("")
  const [selectedPageResults, setSelectedPageResults] = useState(25)
  const [selectedSort, setSelectedSort] = useState("Newest entries")
  // const [results, setResults] = useState({
  //   data: [],
  //   isFetching: true,
  //   error: null
  // })
  // useEffect(() => {
  //   _search();
  //   return _resetSearchResults;
  // }, [])

  // const _search = async () => {
  //   try {
  //     const response = await api.getSearchResults(searchTerm)
  //     if (response.status === 200) {
  //       setResults({ data: response.data, isFetching: false, error: null })
  //     } else {
  //       setResults({ ...results, isFetching: false, error: response.error })
  //     }
  //   } catch (err) {
  //     console.error("* Error caught in _search", err)
  //     setResults({ ...results.data, isFetching: false, error: err })
  //   }
  // }
  // const _resetSearchResults = () =>
  //   setResults({ data: [], isFetching: false, error: null })
  // const _goBack = () =>
  //   window.dispatchEvent(
  //     new CustomEvent("transition", { detail: { nextState: "landing" } })
  //   )
  // const { isFetching, data: products } = results
  return (
    <Flex flexDirection='column'>
      <Space mt={3} px={{ xs: 4, lg: 14 }}>
        <Flex bg='gunmetal' flexDirection='row' alignItems='center'>
          <Space pt='7px' pb='2px' pr={{ xs: 0, lg: 5 }}>
            <Box width={{ xs: 9 / 10, sm: 1, lg: 3 / 4 }}>
              <Input
                placeholder='Value'
                onChange={setSearchValue}
                label='Button Label'
                name='search'
                value={searchValue}
              />
            </Box>
          </Space>
          <Hide sm md lg xlg>
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
              width={1 / 4}
              fontSize={0}
              onClick={() => {}}
              variant='primary'
              title='Button Label'
            />
          </Hide>
        </Flex>
      </Space>
      <Flex width={1} flexDirection='row' flexWrap='wrap'>
        <Space pl={{ xs: 4, lg: 14 }} pr={{ xs: 10, lg: 3 }} mt={{ xs: 5, lg: 6 }}>
          <Flex
            width={{ xs: 1 }}
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography alignSelf='center' color='gunmetal' fontSize={3}>
              Browsing products for Rolex - 300 results
            </Typography>
            <Hide xs sm md>
              <Flex width={4 / 10} flexDirection='row' alignItems='flex-end'>
                <Space mx={3}>
                  <Dropdown
                    colors='dropdown-white'
                    id='results-per-page'
                    label='Results per page'
                    onChangeOption={setSelectedPageResults}
                    options={options}
                    selectedOption={selectedPageResults}
                    width={{ md: 1 / 3 }}
                  />
                </Space>
                <Space mx={3}>
                  <Dropdown
                    colors='dropdown-white'
                    id='sort-by'
                    label='Sort by'
                    onChangeOption={setSelectedSort}
                    options={options}
                    selectedOption={selectedSort}
                    width={{ md: 2 / 3 }}
                  />
                </Space>
              </Flex>
            </Hide>
          </Flex>
        </Space>
        <Space pl={{ xs: 0, lg: 4 }} pr={{ xs: 0, lg: 3 }}>
          <Flex width={1} flexDirection='row' flexWrap='wrap'>
            <Space mt={{xs: 0, lg: 5}}>
              <Box
                border='1px solid #b3c3d4'
                bg='ghost-white'
                width={{ xs: 1, lg: 1 / 6 }}
              >
              here will be the filteeer
              </Box>
            </Space>
            <Space pl={{ xs: 2, lg: 4 }} pr={{ xs: 2, lg: 3 }}>
              <Flex width={{ xs: 1, lg: 5 / 6 }} flexDirection='row' flexWrap='wrap' justifyContent='center'>
                {watches.map(watch => {
                  const { id, imgSrc, price, title } = watch
                  return (
                    <Space key={id} pt={{ xs: 4, lg: 5}} px={{ xs: 2, lg: 3 }}>
                      <Box width={{ xs: 1 / 2, lg: 1 / 5}}>
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
          </Flex>
        </Space>
      </Flex>
      {/* <Flex alignItems='center' width={1}>
        <Space px={3}>
          <IconButton
            color='gunmetal'
            effect='opacity'
            fontSize={4}
            name='arrow_back'
            onClick={_goBack}
          />
        </Space>
        <Title textAlign='center' textStyle='h3'>
          You sought for <Typography as='span'>{`"${searchTerm}"`}</Typography>
        </Title>
      </Flex>
      <Flex alignItems='center' flexDirection='column' width={1}>
        {isFetching ? (
          <ActivityIndicator
            colors={{ background: 'white', primary: 'gunmetal' }}
            size='32px'
          />
        ) : (
          <Flex flexWrap='wrap'>
            {products.length > 0 ? (
              products.map(item => (
                <Space key={item.id} mt={3} px={3}>
                  <Box width={{ xs: 1 / 2, md: 1 / 3, lg: 1 / 4 }}>
                    <Space py={2}>
                      <Card width={1} colors='card-white' textAlign='center'>
                        <Image
                          dimensions={['100%', 240]}
                          src={item.imgSrc}
                          objectFit='contain'
                        />
                        <Space px={3}>
                          <Typography textStyle='h5'>{item.brand}</Typography>
                          <Typography textStyle='subtitle'>
                            {item.model}
                          </Typography>
                          <Description textStyle='caption'>
                            {item.description}
                          </Description>
                          <Typography textStyle='list'>
                            Market price: ${item.price}.00
                          </Typography>
                        </Space>
                      </Card>
                    </Space>
                  </Box>
                </Space>
              ))
            ) : (
              <Typography textAlign='center'>No results found</Typography>
            )}
          </Flex>
        )}
      </Flex> */}
    </Flex>
  )
}

// const Title = styled(Typography)`
//   flex-grow: 1;
// `

// const Description = styled(Typography)`
//   overflow: hidden;
//   display: -webkit-box;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;
// `

const ObservedSearchResults = observe((app, props$) => {
  const region = app.get("region")
  const regionData$ = region
    .getData$()
    .pipe(map(regionData => ({ regionData })))
  return regionData$
})(SearchResults)

SearchResults.propTypes = {
  regionData: PropTypes.object
}

export default ObservedSearchResults
