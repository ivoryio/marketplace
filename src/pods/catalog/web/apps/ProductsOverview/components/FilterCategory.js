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
  const { addFilter, removeFilter } = useContext(Context)

  const CategoryName = () => (
    <CategoryTitle color='pastel-blue' fontSize={0} fontWeight={2}>
      {name}
    </CategoryTitle>
  )

  const ExpandIcon = () => (
    <Touchable effect='highlight' onClick={() => setShowOptions(prevState => !prevState)}>
      <Flex
        alignItems='center'
        justifyContent='center'
        height='22px'
        width='22px'
        bg='pastel-blue'
        borderRadius='round'>
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
          left={<CategoryName />}
          right={<ExpandIcon />}
        />
      </Space>
      {showOptions &&
        (options
          ? options.map(filter => (
                <FilterOption
                  key={`filter-${filter}`}
                  addFilter={addFilter(name)}
                  removeFilter={removeFilter(name)}
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
  options: PropTypes.arrayOf(PropTypes.string)
}

export default FilterCategory
