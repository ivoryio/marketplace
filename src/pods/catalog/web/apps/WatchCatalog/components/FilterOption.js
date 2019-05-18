import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { DataContext } from '../services/Provider'
import {
  Checkbox,
  Space
} from '@ivoryio/kogaio'

const FilterOption = ({
  title,
  addFilter,
  removeFilter
}) => {
  const { activeFiltersAsArray } = useContext(DataContext)

  const handleCheck = ev => {
    if (activeFiltersAsArray.includes(title)) {
      removeFilter(title)()
    } else {
      addFilter(title)()
    }
  }

  const isChecked = activeFiltersAsArray.includes(title)

  return (
    <Space pl={1} py={3}>
      <Checkbox
        id={`checkbox-${title}`}
        checked={isChecked}
        label={title}
        onChange={handleCheck}
        size={14}
      />
    </Space>
  )
}

FilterOption.propTypes = {
  addFilter: PropTypes.func,
  removeFilter: PropTypes.func,
  title: PropTypes.string
}

export default FilterOption