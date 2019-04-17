import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { map } from 'rxjs/operators'
import { observe } from 'frint-react'

import Card from '@ivoryio/kogaio/Card'
import Image from '@ivoryio/kogaio/Image'
import IconButton from '@ivoryio/kogaio/IconButton'
import Typography from '@ivoryio/kogaio/Typography'
import { Box, Flex, Space } from '@ivoryio/kogaio/Responsive'
import ActivityIndicator from '@ivoryio/kogaio/ActivityIndicator'

import api from '../../services/catalog.dataservice'

const SearchResults = ({ regionData: { searchTerm } }) => {
  const [results, setResults] = useState({
    data: [],
    isFetching: false,
    error: null
  })
  useEffect(() => {
    _search()
    return _resetSearchResults
  }, [])

  const _search = async () => {
    setResults({ ...results, isFetching: true })
    try {
      const response = await api.getSearchResults(searchTerm)
      if (response.status === 200) {
        setResults({ data: response.data, isFetching: false, error: null })
      } else {
        setResults({ ...results, isFetching: false, error: response.error })
      }
    } catch (err) {
      console.error('* Error caught in _search', err)
      setResults({ ...results.data, isFetching: false, error: err })
    }
  }
  const _resetSearchResults = () =>
    setResults({ data: [], isFetching: false, error: null })
  const _goBack = () => window.dispatchEvent(new Event('goBack'))
  const { isFetching, data: products } = results
  return (
    <Space py={4}>
      <Flex alignItems='center' width={1}>
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
                          src={item.imgsrc}
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
      </Flex>
    </Space>
  )
}

const Title = styled(Typography)`
  flex-grow: 1;
`

const Description = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const ObservedSearchResults = observe((app, props$) => {
  const region = app.get('region')
  const regionData$ = region
    .getData$()
    .pipe(map(regionData => ({ regionData })))
  return regionData$
})(SearchResults)

SearchResults.propTypes = {
  regionData: PropTypes.object
}

export default ObservedSearchResults
