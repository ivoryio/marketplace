import React, { useContext } from "react"
import styled from "styled-components"

import { Context } from "../services/Provider"
import { categoryProvenience } from "../services/helpers"
import { ActiveFilter, FilterCategory } from "."

import {
  Flex,
  Hide,
  Icon,
  Space,
  themeGet,
  Typography
} from "@ivoryio/kogaio"

const FilterSection = () => {
  const contextData = useContext(Context)
  const {
    activeFilters,
    activeFiltersAsArray,
    handleActiveFilters,
    searchResults: {
      data: { filters }
    }
  } = contextData
  return (
    <Space p={4}>
      <Container width={1} bg='ghost-white' flexDirection='column'>
          <Flex
            width={1}
            alignItems='center'
            flexWrap='wrap'
            justifyContent={{ xs: "space-between",
            lg: "flex-start" }}
          >
            <Flex
              width={{ xs: 1, md: 1 / 5, lg: 1 }}
              alignItems='center'
            >
              <Hide lg xlg>
                <Icon name='filter_list' fontSize={3} />
              </Hide>
              <Space ml={3}>
                <Typography color='gunmetal' fontSize={0} fontWeight={2}>
                  FILTER RESULTS
                </Typography>
              </Space>
            </Flex>
            <Space mt={{ xs: 2, md: 0, lg: 3 }}>
              <ActiveFiltersWrapper
                width={{ xs:1, md: 4 / 5, lg: 1 }}
                flexWrap='wrap'
                justifyContent={{ md: 'flex-end', lg: 'flex-start' }}
              >
                {activeFiltersAsArray.map(item => {
                  const category = categoryProvenience(item, activeFilters)
                  return (
                    <ActiveFilter
                      key={`active-filter-${item}`}
                      title={item}
                      onClickIcon={handleActiveFilters(category)("pop", item)}
                    />
                  )
                })}
              </ActiveFiltersWrapper>
            </Space>
            </Flex>
            <Space mt={{ xs: 2, md: 4, lg: 0 }}>
              <Flex width={1} flexWrap='wrap'>
                {
                  Object.keys(filters).map(categoryName => (
                    <FilterCategory
                      key={`${categoryName}-filter`}
                      name={categoryName}
                      options={filters[categoryName]}
                    />
                  ))
                }
              </Flex>
            </Space>
      </Container>
    </Space>
  )
}

const ActiveFiltersWrapper = styled(Flex)`
  & div:not(:first-child) {
    margin-left: ${themeGet("space.2")}px;
  }
`

const Container = styled(Flex)`
  border: ${themeGet("borders.1")} ${themeGet("colors.pastel-blue")};
`

export default FilterSection
