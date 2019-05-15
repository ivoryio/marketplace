import React, { useContext } from 'react'
import styled from 'styled-components'
import { Region } from 'frint-react'
import { ActivityIndicator, Box, Button, Flex, Hide, themeGet, Space } from '@ivoryio/kogaio'

import { NavigationContext } from '../WatchCatalogEntry'
import { AddToCart, Gallery, ProductSpecificationsMobile, ProductSpecificationsWeb } from '../components'

const WatchDetails = () => {
  const {
    currentScreen,
    NavigateTo,
    setActiveWatchId,
    watchDetails: {
      data: {
        brand,
        model,
        price,
        imgList
      },
      isFetching
    }
  } = useContext(NavigationContext)

  const goBack = () => {
    setActiveWatchId('')
    NavigateTo('watch-list')
  }

  if (!currentScreen.includes('watch-details')) {
    return null
  }

  if (isFetching) {
    return <Space mx='auto' mt={{ xs: 3, md: 6, lg: 4 }}>
      <ActivityIndicator
        colors={{ background: 'white', primary: 'gunmetal' }}
        size='32px'
      />
    </Space>
  }
  return (
    <Flex flexDirection='column' alignItems='center'>
      <Flex width={1}>
        <Space ml={4}>
          <Button
            bg='pastel-blue'
            title='Go Back'
            onClick={goBack}
          />
        </Space>
      </Flex>
      <Space mt={{ xs: 4, lg: 5 }}>
        <Flex flexWrap='wrap' width={{ xs: 1, lg: 2 / 3 }}>
          <Flex flexWrap='wrap' width={{ xs: 1, lg: 6 / 10 }}>
            <Gallery imgList={imgList} />
            <Hide lg>
            <Space px={4} mt={6}>
              <ProductSpecificationsMobile width={1} />
            </Space>
          </Hide>
          <Hide xs sm md>
              <Space px={4} mt={2}>
                <ProductSpecificationsWeb width={1} />
              </Space>
              <Flex width={1 / 4} />
          </Hide>
        </Flex>
        <Space mt={{ xs: 2, lg: 0 }}>
          <AddToCart
            brand={brand}
            model={model}
            price={price}
          />
        </Space>
        </Flex>
      </Space>
        <Space py={{ xs: 6, lg: 15  }} mt={10}>
          <NewestWatchesWrapper bg='ghost-white' width={1}>
            <Region name='newest-watches' />
          </NewestWatchesWrapper>
        </Space>
    </Flex>
  )
}

const NewestWatchesWrapper = styled(Box)`
  border: ${themeGet('borders.1')} ${themeGet('colors.pastel-blue')};
`

export default WatchDetails

