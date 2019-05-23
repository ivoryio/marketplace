import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Card, Flex, Image, Space, Typography } from '@ivoryio/kogaio'

const ProductCard = ({
  id,
  imgSrc,
  isAwaitingData,
  price,
  description,
  ...props
}) => (
  <Card
    borderRadius={4}
    display='flex'
    flexDirection='column'
    variant='white'
    width={1}
    {...props}>
    <Flex alignItems='center' justifyContent='center' width={1}>
      {isAwaitingData ? (
        <Box bg='ice-white' height='155px' width={1} />
      ) : (
        <Image
          alt={`watch-${id}`}
          src={imgSrc}
          dimensions={['100%', 155]}
          objectFit='contain'
        />
      )}
    </Flex>
    <Space mt={3} px={{ xs: 4, lg: 6 }}>
      <Flex alignItems='center' flexDirection='column' height='34px'>
        {isAwaitingData ? (
          <>
            <Box bg='ice-white' height='14px' width={1} />
            <Space mt={1}>
              <Box bg='ice-white' height='14px' width={1} />
            </Space>
          </>
        ) : (
          <ProductDescription color='gunmetal' fontSize={1}>
            {description}
          </ProductDescription>
        )}
      </Flex>
    </Space>
    <Space mt={1} px={{ xs: 4, lg: 6 }}>
      {isAwaitingData ? (
        <Box mx='auto' my={1} bg='ice-white' height='28px' width={1 / 2} />
      ) : (
        <Typography color='gunmetal' fontSize={4} fontWeight={2}>
          {price}
        </Typography>
      )}
    </Space>
  </Card>
)

const ProductDescription = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

ProductCard.propTypes = {
  id: PropTypes.string,
  imgSrc: PropTypes.string,
  isAwaitingData: PropTypes.bool,
  description: PropTypes.string,
  price: PropTypes.string
}

export default ProductCard
