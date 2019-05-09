import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Card,
  Flex,
  Image,
  Space,
  Typography
} from '@ivoryio/kogaio'

import { ScreensContext } from '../WatchCatalogEntry'

const ProductCard = ({ imgSrc, price, description, ...props }) => {
  const { NavigateTo } = useContext(ScreensContext)

  return (
    <Space pb={4}>
      <Card
        onClick={() => NavigateTo('watch-details')}
        borderRadius={4}
        display='flex'
        flexDirection='column'
        variant='white'
        {...props}
      >
        <Flex alignItems='center' justifyContent='center' width={1}>
          <Image src={imgSrc} dimensions={['100%', 155]} objectFit='contain' />
        </Flex>
        <Space mt={3} px={{ xs: 4, lg: 6 }}>
          <Flex alignItems='center' height='34px'>
            <ProductDescription
              color='gunmetal'
              fontSize={1}
            >
              {description}
            </ProductDescription>
          </Flex>
        </Space>
        <Space mt={1} px={{ xs: 4, lg: 6 }}>
          <Typography
            color='gunmetal'
            fontSize={4}
            fontWeight={2}
          >
            {price}
          </Typography>
        </Space>
      </Card>
    </Space>
  )
}

const ProductDescription = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

ProductCard.propTypes = {
  imgSrc: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string
}

export default ProductCard
