import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Flex, Icon, Space, Touchable, Typography } from '@ivoryio/kogaio'

import { Context } from '../services/Provider'
import { FilterOption, Row } from '.'

const FilterCategory = ({
  name,
  options,
  ...props
}) => {
  const [showOptions, setShowOptions] = useState(false)
  const handleShowOptions = () => setShowOptions(!showOptions)
  const contextData = useContext(Context)
  const { handleActiveFilters } = contextData

  const LeftCategorySide = () => (
    <CategoryTitle color='pastel-blue' fontSize={0} fontWeight={2}>
      {name}
    </CategoryTitle>
  )

  const RightCategorySide = () => (
    <Touchable effect='highlight' onClick={handleShowOptions}>
      <Flex
        alignItems='center'
        justifyContent='center'
        height='22px'
        width='22px'
        bg='pastel-blue'
        borderRadius={5}>
        <Icon
          color='ghost-white'
          name={showOptions ? 'arrow_drop_up' : 'arrow_drop_down'}
          fontSize={3}
        />
      </Flex>
    </Touchable>
  )

  return (
    <Flex width={1} flexDirection='column' {...props}>
      <Space py={2}>  
        <Row
          left={<LeftCategorySide />}
          right={<RightCategorySide />}
        />
      </Space>
      {showOptions &&
        (options
          ? options.map(filter => (
                <FilterOption
                  key={`filter-${filter}`}
                  handleActiveFilters={
                    handleActiveFilters(name)
                  }
                  title={filter}
                />
              )
            ) : null)}
    </Flex>
  )
}

const CategoryTitle = styled(Typography)`
  text-transform: capitalize;
`

FilterCategory.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
}

export default FilterCategory
