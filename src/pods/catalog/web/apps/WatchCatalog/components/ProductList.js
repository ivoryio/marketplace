import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Flex, Space } from '@ivoryio/kogaio'
import { themeGet } from '@ivoryio/kogaio'

import { ProductCard } from '.'

const ProductList = ({ watches, isFetching }) => (
  <Space mt={{ xs: 3, md: 6, lg: 4 }} px={{ xs: 2, lg: 3 }}>
    <Flex width={1} flexWrap='wrap' position='relative'>
      {watches.map(({ id, imgSrc, price, description }) => (
        <Space key={`watch-${id}`} pb={{ xs: 4, lg: 6 }} px={{ xs: 2, lg: 3 }}>
          <Flex width={{ xs: 1, md: 1 / 2, lg: 1 / 3 }} justifyContent='center'>
            <ProductCard
              id={id}
              imgSrc={imgSrc}
              price={`$${price}`}
              description={description}
            />
          </Flex>
        </Space>
      ))}
      <LoadingOverlay show={isFetching} />
    </Flex>
  </Space>
)

const LoadingOverlay = styled(Flex)`
  background-color: ${themeGet('colors.overlay')};
  height: 100%;
  left: 0;
  opacity: 0.6;
  position: absolute;
  top: 0;
  width: 100%;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
`

ProductList.propTypes = {
  watches: PropTypes.array,
  isFetching: PropTypes.bool
}

ProductList.defaultProps = {
  watches: []
}

export default ProductList
