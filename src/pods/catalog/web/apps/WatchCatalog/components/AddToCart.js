import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Button, Card, Flex, Hide, Icon, Space, themeGet, Touchable, Typography } from '@ivoryio/kogaio'

import { NavigationContext } from '../WatchCatalogEntry'
import { formatPrice } from '../services/helpers'

const AddToCart = ({ ...props }) => {
  const [quantity, setQuantity] = useState(1)

  const { watchDetails: {
    data: {
      brand,
      model,
      price
    }
  } } = useContext(NavigationContext)

  const _decrementQuantity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1)
    }
  }

  const scrollTo = elementId => () => {
    const element = document.getElementById(elementId)
    element.scrollIntoView({ behavior: "smooth" })
  }

  const anchors = [{ title: 'Details', scrollingId: 'details' }, { title: 'Info & Stats', scrollingId: 'info&stats' }]
  const formattedPrice = `$${formatPrice(Number(price))}`
  return (
    <Space bottom={0}>
      <Box
        width={{ xs: 1, lg: 4 / 10 }}
        position={{ xs: 'sticky', lg: 'block' }}
        {...props}
      >
        <Space pt={4} pb={{ xs: 4, lg: 0 }} top={0}>
          <Card
            zIndex={2}
            width={1}
            position={{ xs: 'block', lg: 'sticky' }}
            bg='white'
            boxShadow='card-simple'
            display='flex'
            justifyContent='center'
          >
            <Flex
              flexDirection='column'
              width={{ xs: 1, md: 7 / 10, lg: 1 }}
            >
              <Space px={{ xs: 6, md: 0, lg: 4 }}>
                <WatchTitle
                  color='gunmetal'
                  fontSize={4}
                >
                  {brand} {model}
                </WatchTitle>
              </Space>
              <Space mt={6} px={{ xs: 6, md: 0, lg: 6 }}>
                <Flex
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Typography
                    color='gunmetal'
                    fontSize={4}
                    fontWeight={2}
                  >
                    {formattedPrice}
                  </Typography>
                  <Flex width={{ xs: 4 / 10, md: 1 / 4, lg: 4 / 10 }}>
                    <Touchable
                      width={3 / 10}
                      effect='highlight'
                      onClick={_decrementQuantity}
                    >
                      <QuantityModifierWrapper
                        alignItems='center'
                        justifyContent='center'
                        height='36px'
                      >
                        <Typography>-</Typography>
                      </QuantityModifierWrapper>
                    </Touchable>
                    <QuantityWrapper
                      alignItems='center'
                      justifyContent='center'
                      width={4 / 10}
                      height='36px'
                    >
                      {quantity}
                    </QuantityWrapper>
                    <Touchable
                      effect='highlight'
                      onClick={() => setQuantity(prevState => prevState + 1)}
                      width={3 / 10}
                    >
                      <QuantityModifierWrapper
                        height='36px'
                        alignItems='center'
                        justifyContent='center'
                      >
                        <Typography>+</Typography>
                      </QuantityModifierWrapper>
                    </Touchable>
                  </Flex>
                </Flex>
              </Space>
              <Space mt={5} px={{ xs: 6, md: 0, lg: 6 }}>
                <Box width={1}>
                  <Button
                    width={1}
                    title='ADD TO MY CART'
                    onClick={() => { }}
                  />
                </Box>
              </Space>
              <Hide xs sm md>
                {
                  anchors.map(({ title, scrollingId }, index) => (
                    <Space key={`anchor-to-${scrollingId}`} mt={index === 0 ? 6 : 0}>
                      <Touchable effect='opacity' onClick={scrollTo(scrollingId)}>
                        <Space px={6} py={4}>
                          <WebScrollingItem alignItems='center' width={1}>
                            <Typography>{title}</Typography>
                            <Space ml={1}>
                              <Icon name='link' />
                            </Space>
                          </WebScrollingItem>
                        </Space>
                      </Touchable>
                    </Space>
                  ))
                }
              </Hide>
            </Flex>
          </Card>
        </Space>
      </Box>
    </Space>
  )
}

const QuantityWrapper = styled(Flex)`
  border-top: ${themeGet('borders.1')}${themeGet('colors.gunmetal')};
  border-bottom: ${themeGet('borders.1')}${themeGet('colors.gunmetal')};
`
const QuantityModifierWrapper = styled(Flex)`
  border: ${themeGet('borders.1')}${themeGet('colors.gunmetal')};
`
const WebScrollingItem = styled(Flex)`
  border-top: ${themeGet('borders.1')} ${themeGet('colors.brand-disabled')};
`
const WatchTitle = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

AddToCart.propTypes = {
  brand: PropTypes.string,
  model: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default AddToCart
