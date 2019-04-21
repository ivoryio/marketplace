import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Space } from '@ivoryio/kogaio'

import { ProductCard } from '.'

const ProductList = ({ watches }) => (
  <Space
    mt={{ xs: 3, md: 6, lg: 4 }}
    px={{ xs: 2, lg: 3 }}
  >
    <Flex width={1} flexWrap='wrap'>
      {watches.map(({ id, imgSrc, price, title }) => (
        <Space key={id} pb={{ xs: 4, lg: 6 }} px={{ xs: 2, lg: 3 }}>
          <Box width={{ xs: 1, md: 1 / 2, lg: 1 / 3 }}>
            <ProductCard imgSrc={imgSrc} price={price} title={title} />
          </Box>
        </Space>
      ))}
    </Flex>
  </Space>
)

ProductList.propTypes = {
  watches: PropTypes.array
}

ProductList.defaultProps = {
  watches: []
}

export default ProductList
