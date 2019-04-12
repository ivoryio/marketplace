import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Card,
  Flex,
  Image,
  Space,
  Typography

} from '@ivoryio/kogaio'

const ProductCard = ({ imgSrc, price, title, ...props }) => (
  <Space pb={2}>
    <Card
      borderRadius={3}
      display='flex'
      flexDirection='column'
      colors='card-white'
      {...props}
    >
      <Flex alignItems='center' justifyContent='center' width={1}>
        <Image src={imgSrc} dimensions={['100%', 155]} objectFit='contain' />
      </Flex>
      <Space mt={3} px={{ xs: 4, lg: 5 }}>
        <Flex height='34px'>
          <ProductTitle
            color='gunmetal'
            fontSize={1}
          >
            {title}
          </ProductTitle>
        </Flex>
      </Space>
      <Space mt={3} px={{ xs: 4, lg: 5 }}>
        <Typography
          color='gunmetal'
          fontSize={0}
          fontWeight={8}
        >
          {price}
        </Typography>
      </Space>
    </Card>
  </Space>
)

const ProductTitle = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

ProductCard.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string
}

export default ProductCard
