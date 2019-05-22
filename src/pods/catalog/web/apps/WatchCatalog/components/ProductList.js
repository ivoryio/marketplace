import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, Flex, Space } from '@ivoryio/kogaio'

import { ProductCard } from '.'

const ProductList = ({ watches, isFetching }) => (
  <Space mt={{ xs: 3, md: 6, lg: 4 }} px={{ xs: 2, lg: 3 }}>
    <Flex width={1} flexWrap='wrap'>
      {isFetching ? (
        <Space mx='auto' mt={{ xs: 3, md: 6, lg: 4 }}>
          <ActivityIndicator
            colors={{ background: 'white', primary: 'gunmetal' }}
            size='32px'
          />
        </Space>
      ) : (
        watches.map(({ id, imgSrc, price, description }) => (
          <Space
            key={`watch-${id}`}
            pb={{ xs: 4, lg: 6 }}
            px={{ xs: 2, lg: 3 }}>
            <Flex
              width={{ xs: 1, md: 1 / 2, lg: 1 / 3 }}
              justifyContent='center'>
              <Space pb={4}>
                <ProductCard
                  id={id}
                  imgSrc={imgSrc}
                  price={`$${price}`}
                  description={description}
                />
              </Space>
            </Flex>
          </Space>
        ))
      )}
    </Flex>
  </Space>
)

ProductList.propTypes = {
  watches: PropTypes.array,
  isFetching: PropTypes.bool
}

ProductList.defaultProps = {
  watches: []
}

export default ProductList
