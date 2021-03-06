import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
    Box,
    Flex,
    Image,
    Space,
    Typography
} from '@ivoryio/kogaio'
const CategoryCard = ({ imgSrc, description }) => (
  <Space mb={5} px={{ xs: 2, md: 3, lg: 6 }}>
    <Box width={{ xs: 1 / 2, md: 3 / 10, lg: 1 / 4 }}>
      <Image src={imgSrc} dimensions={['100%', 120]} />
      <Space mt={2}>
        <Flex alignItems='center' height='34px'>
          <StyledDescription color='gunmetal' textStyle='h6' textAlign='center'>
            {description}
          </StyledDescription>
        </Flex>
      </Space>
    </Box>
  </Space>
)

const StyledDescription = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

CategoryCard.propTypes = {
  imgSrc: PropTypes.string,
  description: PropTypes.string
} 

export default CategoryCard
