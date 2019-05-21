import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Collapsible } from '@ivoryio/kogaio'

import { FilterOption } from '.'
import { DataContext } from '../services/DataProvider'
import { capitalizeFirstChar } from '../services/helpers'

const FilterCategory = ({ name, options, removeFilter, ...props }) => {
  const {
    watchList: { activeFilters, setActiveFilters }
  } = useContext(DataContext)
  const addFilter = category => filter => () =>
    setActiveFilters(prevActive => ({
      ...prevActive,
      [category]: [...activeFilters[category], filter]
    }))
  return (
    <Collapsible width={1} title={capitalizeFirstChar(name)} {...props}>
      {options
        ? options.map(filter => (
            <FilterOption
              key={`filter-${filter}`}
              addFilter={addFilter(name)}
              removeFilter={removeFilter(name)}
              title={filter}
            />
          ))
        : null}
    </Collapsible>
  )
}

FilterCategory.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  removeFilter: PropTypes.func
}

export default FilterCategory
