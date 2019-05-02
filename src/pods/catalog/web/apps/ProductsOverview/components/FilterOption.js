import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Context } from '../services/Provider'
import {
  Checkbox,
  Space
} from '@ivoryio/kogaio'

const FilterOption = ({
    title,
    handleActiveFilters
  }) => {
    const { activeFiltersAsArray } = useContext(Context)
  
    const handleCheck = ev => {
      if(activeFiltersAsArray.includes(title)) {
        handleActiveFilters('pop', title)()
      } else {
        handleActiveFilters('push', title)()
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
    handleActiveFilters: PropTypes.func,
    title: PropTypes.string
  }

  export default FilterOption