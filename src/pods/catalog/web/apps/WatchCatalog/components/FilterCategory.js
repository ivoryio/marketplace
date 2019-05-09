import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Collapsible } from '@ivoryio/kogaio'

import { Context } from '../services/Provider'
import { FilterOption } from '.'

const FilterCategory = ({
  name,
  options,
  ...props
}) => {
  const { addFilter, removeFilter } = useContext(Context)
  const title = name.charAt(0).toUpperCase() + name.slice(1)
  return (
      <Collapsible
        width={1}
        title={title}
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
