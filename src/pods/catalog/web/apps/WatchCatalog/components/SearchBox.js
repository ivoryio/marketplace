import React, { useEffect, useState } from 'react'
import { Hub } from '@aws-amplify/core'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Flex,
  Hide,
  Icon,
  Input,
  Space
} from '@ivoryio/kogaio'

import { SquaredBox } from '.'

const SearchBox = ({ initialValue, ...rest }) => {
  const [searchValue, setSearchValue] = useState(initialValue)
  useEffect(() => {
    setSearchValue(initialValue)
  }, [initialValue])

  const updateSearchValue = ev => {
    const { value } = ev.target
    setSearchValue(value)
  }

  const handleSearch = () =>
    Hub.dispatch(
      'TransitionChannel',
      {
        event: 'transition',
        data: { destination: 'search-results', searchTerm: searchValue },
        message: `Request to transition to search-results`
      },
      'SearchBox'
    )

  return (
    <Space px={{ xs: 4, lg: 378 }}>
      <Flex
        width={1}
        bg='ghost-white'
        alignItems='center'
        justifyContent='center'
        {...rest}>
        <Space pt={6} pb='2px' pr={{ xs: 0, lg: 2 }}>
          <Box width={{ xs: 1, lg: 4 / 5 }}>
            <Input
              placeholder='Search...'
              onChange={updateSearchValue}
              name='search'
              value={searchValue}
            />
          </Box>
        </Space>
        <Hide lg xlg>
          <SquaredBox bg='brand' onClick={handleSearch} size={34}>
            <Icon color='white' fontSize={3} name='search' />
          </SquaredBox>
        </Hide>
        <Hide xs sm md>
          <Button
            width={1 / 5}
            fontSize={0}
            onClick={handleSearch}
            title='Search'
          />
        </Hide>
      </Flex>
    </Space>
  )
}

SearchBox.propTypes = {
  initialValue: PropTypes.string
}

export default SearchBox
