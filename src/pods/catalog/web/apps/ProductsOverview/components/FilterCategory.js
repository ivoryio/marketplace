import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Flex, Icon, Space, Touchable, Typography } from '@ivoryio/kogaio'

import { Context } from '../services/Provider'
import { FilterOption } from '.'
const Row = ({ left, right }) => (
  <Space pb={1} pt={4}>
    <Flex width={1} alignItems='center' justifyContent='space-between'>
      {left}
      {right}
    </Flex>
  </Space>
)

const FilterCategory = ({
  name,
  options,
  activeFilterCategories,
  ...props
}) => {
  const [showOptions, setShowOptions] = useState(false)
  const handleShowOptions = () => setShowOptions(!showOptions)

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
    <Context.Consumer>
      {
        context => {
          const { data: { activeFilters, handleActiveFilters } } = context
          return (
            <Space>
              <Flex width={1} flexDirection='column' {...props}>
                  <Row
                    left={<LeftCategorySide />}
                    right={<RightCategorySide />}
                  />
                {showOptions &&
                  (options
                    ? options.map(filter => (
                          <FilterOption
                            key={`filter-${filter}`}
                            activeFilters={activeFilters}
                            handleActiveFilters={
                              handleActiveFilters
                            }
                            title={filter}
                          />
                        )
                      ) : null)}
              </Flex>
            </Space>
          )
        }
      }
    </Context.Consumer>
  )
}

const CategoryTitle = styled(Typography)`
  text-transform: capitalize;
`

Row.propTypes = {
  left: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.element
  ]),
  right: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.element
  ])
}

FilterCategory.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  activeFilterCategories: PropTypes.arrayOf(PropTypes.object)
}

export default FilterCategory
