import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Box,
  Button,
  Card,
  Flex,
  Hide,
  Icon,
  Space,
  themeGet,
  Touchable,
  Typography
} from '@ivoryio/kogaio'

import { formatPrice } from '../services/helpers'
import { DetailsContext } from '../services/DetailsProvider'

const AddToCart = ({ isAwaitingData, ...props }) => {
  const [quantity, setQuantity] = useState(1)

  const {
    details: { brand, model, price }
  } = useContext(DetailsContext)
  const anchors = [
    { title: 'Details', targetId: 'details' },
    { title: 'Info & Stats', targetId: 'info-stats' }
  ]
  const formattedPrice = `$${formatPrice(Number(price))}`

  const _decrementQuantity = () =>
    quantity !== 1 ? setQuantity(quantity - 1) : null

  const scrollTo = targetId => () => {
    const target = document.getElementById(targetId)
    target.scrollIntoView({ behavior: 'smooth' })
  }

  const isQuantityOne = quantity === 1
  return (
    <Box
      bottom={0}
      width={{ xs: 1, lg: 2 / 5 }}
      position={{ xs: 'sticky', lg: 'block' }}
      {...props}>
      <Space pt={4} pb={{ xs: 4, lg: 0 }}>
        <Card
          top={0}
          zIndex={2}
          width={1}
          position={{ xs: 'block', lg: 'sticky' }}
          bg='white'
          boxShadow='card-simple'>
          <Space mx='auto'>
            <Flex flexDirection='column' width={{ xs: 1, md: 7 / 10, lg: 1 }}>
              <Space px={{ xs: 6, md: 0, lg: 4 }}>
                {isAwaitingData ? (
                  <Space mx={{ xs: 6, md: 0, lg: 4 }}>
                    <Box width={4 / 5} height='28px' bg='ice-white' />
                  </Space>
                ) : (
                  <Typography color='gunmetal' fontSize={4} truncate>
                    {brand} {model}
                  </Typography>
                )}
              </Space>
              <Space mt={6} px={{ xs: 6, md: 0, lg: 6 }}>
                <Flex alignItems='center' justifyContent='space-between'>
                  {isAwaitingData ? (
                    <Box width={2 / 5} height='28px' bg='ice-white' />
                  ) : (
                    <Typography color='gunmetal' fontSize={4} fontWeight={2}>
                      {formattedPrice}
                    </Typography>
                  )}
                  <Flex width={{ xs: 2 / 5, md: 1 / 4, lg: 2 / 5 }}>
                    <Touchable
                      width={3 / 10}
                      disabled={isQuantityOne}
                      effect={isQuantityOne ? 'no-feedback' : 'highlight'}
                      onClick={_decrementQuantity}>
                      <QuantityModifierWrapper
                        alignItems='center'
                        justifyContent='center'
                        height='36px'>
                        <Typography
                          fontSize={1}
                          color={
                            isQuantityOne ? 'brand-disabled' : 'gunmetal'
                          }>
                          -
                        </Typography>
                      </QuantityModifierWrapper>
                    </Touchable>
                    <QuantityWrapper
                      alignItems='center'
                      justifyContent='center'
                      width={2 / 5}
                      height='36px'>
                      {quantity}
                    </QuantityWrapper>
                    <Touchable
                      effect='highlight'
                      onClick={() => setQuantity(prevState => prevState + 1)}
                      width={3 / 10}>
                      <QuantityModifierWrapper
                        height='36px'
                        alignItems='center'
                        justifyContent='center'>
                        <Typography color='gunmetal' fontSize={1}>
                          +
                        </Typography>
                      </QuantityModifierWrapper>
                    </Touchable>
                  </Flex>
                </Flex>
              </Space>
              <Space mt={5} px={{ xs: 6, md: 0, lg: 6 }}>
                <Box width={1}>
                  <Button width={1} title='ADD TO MY CART' onClick={() => {}} />
                </Box>
              </Space>
              <Hide xs sm md>
                {anchors.map(({ title, targetId }, index) => (
                  <Space key={`anchor-to-${targetId}`} mt={index === 0 ? 6 : 0}>
                    <Touchable effect='opacity' onClick={scrollTo(targetId)}>
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
                ))}
              </Hide>
            </Flex>
          </Space>
        </Card>
      </Space>
    </Box>
  )
}

const QuantityWrapper = styled(Flex)`
  border-top: ${themeGet('borders.1')} ${themeGet('colors.gunmetal')};
  border-bottom: ${themeGet('borders.1')} ${themeGet('colors.gunmetal')};
`
const QuantityModifierWrapper = styled(Flex)`
  border: ${themeGet('borders.1')} ${themeGet('colors.gunmetal')};
`
const WebScrollingItem = styled(Flex)`
  border-top: ${themeGet('borders.1')} ${themeGet('colors.brand-disabled')};
`

AddToCart.propTypes = {
  brand: PropTypes.string,
  isAwaitingData: PropTypes.bool,
  model: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default AddToCart
