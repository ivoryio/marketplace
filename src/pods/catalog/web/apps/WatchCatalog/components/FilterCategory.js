import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Collapsible, Space} from '@ivoryio/kogaio'

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
    <Space py={2}>
      <Collapsible
        width={1}
        title={title}
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
    </Space>
  )
}

FilterCategory.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string)
}

export default FilterCategory
