import React, { useContext } from "react"
import styled from "styled-components"

import { Context } from "../services/Provider"
import { categoryProvenience } from "../services/helpers"
import { ActiveFilter, FilterCategory } from "."

import {
  Box,
  Flex,
  Hide,
  Icon,
  Space,
  themeGet,
  Typography
} from "@ivoryio/kogaio"

const FilterSection = () => {
  const {
    activeFilters,
    activeFiltersAsArray,
    removeFilter,
    searchResults: {
      data: { filters }
    }
  } = useContext(Context)

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
              <Space ml={{xs: 3, lg: 0}}>
                <Typography color='gunmetal' fontSize={0} fontWeight={2}>
                  FILTER RESULTS
                </Typography>
              </Space>
            </Flex>
            <Space mt={{ xs: 1, md: 0, lg: 3 }}>
              <ActiveFiltersWrapper
                width={{ xs:1, md: 4 / 5, lg: 1 }}
                flexWrap='wrap'
                justifyContent={{ md: 'flex-end', lg: 'flex-start' }}
              >
                {activeFiltersAsArray.map(item => {
                  const category = categoryProvenience(item, activeFilters)
                  return (
                    <Box
                      width={{ lg: 1 }}
                      key={`active-filter-${item}`}
                    >
                      <Space
                        mt={1}
                        p={1}
                      >
                        <ActiveFilter
                          title={item}
                          onClickIcon={removeFilter(category)(item)}
                        />
                      </Space>
                    </Box>
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
  & div:not(:last-child) {
    margin-right: ${themeGet("space.2")}px;
  }
`

const Container = styled(Flex)`
  border: ${themeGet("borders.1")} ${themeGet("colors.pastel-blue")};
`

export default FilterSection
