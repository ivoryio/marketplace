import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Flex, Icon, Space, Touchable, Typography } from '@ivoryio/kogaio'

import { Context } from '../services/Provider'

const Row = ({ left, right }) => (
  <Space py={2}>
    <Flex width={1} alignItems='center' justifyContent='space-between'>
      {left}
      {right}
    </Flex>
  </Space>
)

const LeftOptionSide = ({
  categoryName,
  title,
  activeFilters,
  handleActiveFilters
}) => {
  const handleCheck = ev => {
    if(activeFilters.includes(title)) {
      handleActiveFilters('pop', title)()
    } else {
      handleActiveFilters('push', title)()
    }
  }

  const isChecked = activeFilters.includes(title)

  return (
    <Flex alignItems='center'>
      <Checkbox
        name={`checkbox-${title}`}
        value={title}
        type='checkbox'
        checked={isChecked}
        onChange={handleCheck}
      />
      <Space ml={{ xs: 1, md: 2 }}>
        <Typography color='gunmetal' fontSize={1}>
          {title}
        </Typography>
      </Space>
    </Flex>
  )
}

const RightOptionSide = ({ numberOfProducts }) => (
  <Typography>{`(${numberOfProducts})`}</Typography>
)

const FilterCategory = ({
  name,
  options,
  activeFilterCategories,
  handleActiveFilters,
  ...props
}) => {
  const [showOptions, setShowOptions] = useState(false)
  const handleShowOptions = () => setShowOptions(!showOptions)

  const LeftCategorySide = () => (
    <Typography color='pastel-blue' fontSize={0} fontWeight={2}>
      {name}
    </Typography>
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
          const { data: { activeFilters } } = context
          return (
            <Space>
              <Flex width={1} flexDirection='column' {...props}>
                <Row left={<LeftCategorySide />} right={<RightCategorySide />} />
                {showOptions &&
                  (options
                    ? options.map(option => {
                        const { title, numberOfProducts } = option
                        return (
                            <Row
                              key={title}
                              left={
                                <LeftOptionSide
                                  activeFilters={activeFilters}
                                  categoryName={name}
                                  handleActiveFilters={
                                    handleActiveFilters
                                  }
                                  title={title}
                                />
                              }
                              right={
                                <RightOptionSide numberOfProducts={numberOfProducts} />
                              }
                            />
                        )
                      })
                    : null)}
              </Flex>
            </Space>
          )
        }
      }
    </Context.Consumer>
  )
}

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`

LeftOptionSide.propTypes = {
  activeFilters: PropTypes.string,  
  categoryName: PropTypes.string,
  title: PropTypes.string,
  handleActiveFilters: PropTypes.func
}
RightOptionSide.propTypes = {
  numberOfProducts: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
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
  activeFilterCategories: PropTypes.arrayOf(PropTypes.object),
  handleActiveFilters: PropTypes.func
}

export default FilterCategory
