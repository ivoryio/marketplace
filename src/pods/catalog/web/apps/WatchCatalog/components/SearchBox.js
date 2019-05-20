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
  Space,
  Touchable
} from '@ivoryio/kogaio'

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
          <Touchable
            activeOpacity={0.75}
            effect='opacity'
            onClick={handleSearch}>
            <Flex
              width='36px'
              height='36px'
              bg='brand'
              alignItems='center'
              justifyContent='center'>
              <Icon color='white' fontSize={3} name='search' />
            </Flex>
          </Touchable>
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
