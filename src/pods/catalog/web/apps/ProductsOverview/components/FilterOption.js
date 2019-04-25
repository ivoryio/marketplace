import React from 'react'
import PropTypes from 'prop-types'

import {
  Checkbox,
  Space
} from '@ivoryio/kogaio'

const FilterOption = ({
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
    activeFilters: PropTypes.string,
    title: PropTypes.string,
    handleActiveFilters: PropTypes.func
  }

  export default FilterOption