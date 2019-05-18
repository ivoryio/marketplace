import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Collapsible } from '@ivoryio/kogaio'

import { FilterOption } from '.'
import { DataContext } from '../services/Provider'
import { capitalizeFirstChar } from '../services/helpers'

const FilterCategory = ({
  name,
  options,
  ...props
}) => {
  const { addFilter, removeFilter } = useContext(DataContext)
  return (
    <Collapsible
      width={1}
      title={capitalizeFirstChar(name)}
      {...props}
    >
      {options
        ? options.map(filter => (
          <FilterOption
            key={`filter-${filter}`}
            addFilter={addFilter(name)}
            removeFilter={removeFilter(name)}
            title={filter}
          />
        )) : null
      }
    </Collapsible>
  )
}

FilterCategory.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string)
}

export default FilterCategory
