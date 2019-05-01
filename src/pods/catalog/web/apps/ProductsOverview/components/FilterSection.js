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
  const context = useContext(Context)
  const {
    activeFilters,
    activeFiltersAsArray,
    handleActiveFilters,
    searchResults: {
      data: { filters }
    }
  } = context
  return (
    <Space p={4}>
      <Container width={1} bg='ghost-white' flexDirection='column'>
        <Space py={{ lg: 2 }}>
          <Flex
            width={1}
            alignItems='center'
            flexWrap='wrap'
            justifyContent={{ xs: "space-between",
            lg: "flex-start" }}
          >
            <Flex width={1} alignItems='center'>
              <Hide lg xlg>
                <Icon name='filter_list' fontSize={3} />
              </Hide>
              <Space ml={3}>
                <Typography color='gunmetal' fontSize={0} fontWeight={2}>
                  FILTER RESULTS
                </Typography>
              </Space>
            </Flex>
            <Space>
              <ActiveFiltersWrapper
                width={1}
                flexWrap='wrap'
                mt={{ xs: 2, md: 0, lg: 3 }}
              >
                {activeFiltersAsArray.map(item => {
                  const category = categoryProvenience(item, activeFilters)
                  return (
                    <Space my={1} key={`active-filter-${item}`}>
                      <ActiveFilter
                        title={item}
                        onClickIcon={handleActiveFilters(category)("pop", item)}
                      />
                    </Space>
                  )
                })}
              </ActiveFiltersWrapper>
            </Space>
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
