import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Collapsible } from '@ivoryio/kogaio'

import { DataContext } from '../services/Provider'
import { FilterOption } from '.'
import { capitalizeFirstChar } from '../../../../../user/web/apps/Auth/services/auth.helpers'

const FilterCategory = ({
  name,
  options,
  ...props
}) => {
  const { addFilter, removeFilter } = useContext(DataContext)
  const title = capitalizeFirstChar(name)
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
