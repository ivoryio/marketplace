import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Flex, Hide, Icon, Input, Space, Touchable } from '@ivoryio/kogaio'

const SearchBox = ({ initialValue, searchWatches, ...rest }) => {
  const [searchValue, setSearchValue] = useState(initialValue)

  const updateSearchValue = ev => {
    const { value } = ev.target
    ev.preventDefault()
    setSearchValue(value)
  }
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
              placeholder='Value'
              onChange={updateSearchValue}
              name='search'
              value={searchValue}
            />
          </Box>
        </Space>
        <Hide lg xlg>
          <Touchable
            activeOpacity={.75}
            effect='opacity'
            onClick={searchWatches(searchValue)}
          >
            <Flex
              width='36px'
              height='36px'
              bg='brand'
              alignItems='center'
              justifyContent='center'
            >
              <Icon color='white' fontSize={3} name='search' />
            </Flex>
          </Touchable>
        </Hide>
        <Hide xs sm md>
          <Button
            width={1 / 5}
            fontSize={0}
            onClick={searchWatches(searchValue)}
            title='Search' />
        </Hide>
      </Flex>
    </Space>
  )
}

SearchBox.propTypes = {
  initialValue: PropTypes.string,
  searchWatches: PropTypes.func
}

export default SearchBox
