import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Flex, Space, Touchable } from '@ivoryio/kogaio'
import { ConditionalWrap } from '@ivoryio/kogaio/utils'
import { ProductCard } from '.'
import { RootContext } from '../CatalogEntry'

const ProductList = ({ watches, isAwaitingData }) => {
  const { selectWatch } = useContext(RootContext)

  const checkWatchDetails = watchId => () => selectWatch(watchId)
  return (
    <Space mt={{ xs: 3, md: 6, lg: 4 }} px={{ xs: 2, lg: 3 }}>
      <Flex width={1} flexWrap='wrap'>
        {watches.map(({ id, imgSrc, price, description }) => (
          <Space
            key={`watch-${id}`}
            pb={{ xs: 4, lg: 6 }}
            px={{ xs: 2, lg: 3 }}>
            <Flex
              justifyContent='center'
              width={{ xs: 1, md: 1 / 2, lg: 1 / 3 }}>
              <Space pb={4}>
                <ConditionalWrap
                  condition={!isAwaitingData}
                  wrap={() => (
                    <Touchable
                      disabled={isAwaitingData}
                      effect='opacity'
                      onClick={checkWatchDetails(id)}
                      width={1}>
                      <ProductCard
                        id={id}
                        imgSrc={imgSrc}
                        isAwaitingData={isAwaitingData}
                        price={`$${price}`}
                        description={description}
                      />
                    </Touchable>
                  )}>
                  <ProductCard
                    id={id}
                    imgSrc={imgSrc}
                    isAwaitingData={isAwaitingData}
                    price={`$${price}`}
                    description={description}
                  />
                </ConditionalWrap>
              </Space>
            </Flex>
          </Space>
        ))}
      </Flex>
    </Space>
  )
}

ProductList.propTypes = {
  watches: PropTypes.array,
  isAwaitingData: PropTypes.bool
}

ProductList.defaultProps = {
  watches: []
}

export default ProductList
