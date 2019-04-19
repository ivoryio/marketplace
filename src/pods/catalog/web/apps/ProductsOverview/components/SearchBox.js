import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Flex, Hide, Icon, Input, Space } from '@ivoryio/kogaio'

const SearchBox = ({ initialValue, ...rest }) => {
  const [searchValue, setSearchValue] = useState(initialValue)

  const updateSearchValue = ev => {
    const { value } = ev.target
    ev.preventDefault()
    setSearchValue(value)
  }
  return (
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
        <Flex
          alignItems='center'
          justifyContent='center'
          bg='brand'
          width='36px'
          height='36px'>
          <Icon color='white' fontSize={3} name='search' />
        </Flex>
      </Hide>
      <Hide xs sm md>
        <Button width={1 / 5} fontSize={0} onClick={() => {}} title='Search' />
      </Hide>
    </Flex>
  )
}

SearchBox.propTypes = {
  initialValue: PropTypes.string
}

export default SearchBox
