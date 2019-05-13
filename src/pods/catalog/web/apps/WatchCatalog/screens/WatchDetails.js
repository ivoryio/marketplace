import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Box, Button, Card, Flex, Hide, Image, Touchable, themeGet, Typography, Space } from '@ivoryio/kogaio'

import { NavigationContext } from '../WatchCatalogEntry'
import { ProductSpecificationsWeb } from '../components'

const images = [{ key: 'img1', src: 'https://images-na.ssl-images-amazon.com/images/I/71gdBQP%2BqGL._UL1500_.jpg'}, { key: 'img2', src: 'https://images-na.ssl-images-amazon.com/images/I/71gdBQP%2BqGL._UL1500_.jpg'}, { key: 'img3', src: 'https://images-na.ssl-images-amazon.com/images/I/71gdBQP%2BqGL._UL1500_.jpg'}, { key: 'img4', src: 'https://images-na.ssl-images-amazon.com/images/I/71gdBQP%2BqGL._UL1500_.jpg'}]

const WatchDetails = () => {
  const [quantity, setQuantity ] = useState(0)
  const _decrementQuantity = () => {
    if(quantity !== 0) {
      setQuantity(quantity - 1)
    }
  }
  const { currentScreen } = useContext(NavigationContext)
  if (!currentScreen.includes('watch-details')) {
    return null
  }
  return (
    <Flex justifyContent='center' flexWrap='wrap'>
      <Flex flexWrap='wrap' width={{ xs: 1, lg: 4 / 10 }}>
        <Space pl={{ xs: 4 }} pr={{ xs: 4, md: 0 }}>
          <Flex alignItems='center' justifyContent='center' width={{ xs: 1, md: 1 / 2, lg: 1 }}>
            <Image
              width={1}
              height={{ xs: 248, md: 328 }}
              objectFit='contain'
              borderRadius={1}
            />
          </Flex>
        </Space>
        <Space px={{ xs: 2 }} py={{ xs: 2 }}>
          <AvailableImages flexWrap='wrap' width={{ xs:1, md: 1 / 2, lg: 1 }}>
            {
              images.map(image => (
                <Space
                  key={image.key}
                  p={{xs: 2}}>
                  <Box width={{ xs: 1 / 4, md: 1 / 2, lg: 1 / 4 }}>
                    <ImageContainer
                      bg='white'
                      alignItems='center'
                      justifyContent='center'
                      width={1}
                    >
                      <Image
                        src={image.src}
                        width={1}
                        height={{ xs: 70, md: 156, lg: 133 }}
                        objectFit='contain'
                      />
                    </ImageContainer>
                  </Box>
                </Space>
              ))
            }
          </AvailableImages>
        </Space>
      </Flex>
      <AddToCartContainer zIndex={2} width={{xs: 1, lg: 1 / 4}}>
          <Space pt={4} pb={{ xs: 4, lg: 0 }}>
            <Card
              width={1}
              position='sticky'
              bg='white'
              boxShadow='card-simple'
              display='flex'
              justifyContent='center' 
            >
              <CardContent
                flexDirection='column'
                width={{ xs: 1, md: 7 / 10, lg: 1 }}
              >
                <Space px={{ xs: 6, md: 0, lg: 4 }}>
                  <WatchTitle
                    color='gunmetal'
                    fontSize={4}
                  >
                    Rolex Day-Date 36
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
                      $21.000.00
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
                      onClick={() => {}}
                    />
                  </Box>
                </Space>
                <Hide xs sm md>
                  <>
                    <Space mt={6} px={6} py={4}>
                      <WebScrollingItem width={1}>
                        <Typography>Details</Typography>
                      </WebScrollingItem>
                    </Space>
                    <Space px={6} py={4}>
                      <WebScrollingItem width={1}>
                        <Typography>Details</Typography>
                      </WebScrollingItem>
                    </Space>
                  </>
                </Hide>
              </CardContent>
            </Card>
          </Space>
        </AddToCartContainer>
        <Hide xs sm md>
          <Space mt={1}>
            <Space px={4}>
              <ProductSpecificationsWeb width={ 2 / 5 } />
            </Space>
            <Flex width={1 / 4} />
          </Space>
        </Hide>
    </Flex>
  )
}

const AvailableImages = styled(Flex)`
`
const AddToCartContainer = styled(Box)`

`
const CardContent = styled(Flex)``
const WatchTitle = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`
const QuantityWrapper = styled(Flex)`
  border-top: ${themeGet('borders.1')}${themeGet('colors.gunmetal')};
  border-bottom: ${themeGet('borders.1')}${themeGet('colors.gunmetal')};
`
const QuantityModifierWrapper = styled(Flex)`
  border: ${themeGet('borders.1')}${themeGet('colors.gunmetal')};
`
const ImageContainer = styled(Flex)`
  border: ${themeGet('borders.1')} ${themeGet('colors.ghost-white')};
`
const WebScrollingItem = styled(Box)`
  border-top: ${themeGet('borders.1')} ${themeGet('colors.brand-disabled')};
`

export default WatchDetails

