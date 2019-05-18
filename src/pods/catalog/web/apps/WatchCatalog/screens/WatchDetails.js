import React, { useContext } from 'react'
import styled from 'styled-components'
import { Region } from 'frint-react'
import { ActivityIndicator, Box, Flex, Hide, themeGet, Space } from '@ivoryio/kogaio'

import { NavigationContext } from '../WatchCatalogEntry'
import { AddToCart, Gallery, BackButton, ProductSpecificationsMobile, ProductSpecificationsWeb } from '../components'

const WatchDetails = () => {
  const {
    currentScreen,
    navigateTo,
    setActiveWatchId,
    watchDetails: {
      data: {
        imgList
      },
      isFetching
    }
  } = useContext(NavigationContext)

  const goBack = () => {
    setActiveWatchId('')
    navigateTo('watch-list')
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
      <Flex width={{ xs: 1, lg: 2 / 3}}>
        <Space ml={{ xs: 1, md: 2, lg: 4 }} mt={{ xs: 2, md: 3, lg: 4 }}>
          <BackButton onClick={goBack} />
        </Space>
      </Flex>
      <Space mt={{ xs: 4, lg: 5 }}>
        <Flex flexWrap='wrap' width={{ xs: 1, lg: 2 / 3 }}>
          <Flex flexWrap='wrap' width={{ xs: 1, lg: 3 / 5 }}>
            <Gallery imgList={imgList} />
            <Hide lg xlg>
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
            <AddToCart />
          </Space>
        </Flex>
      </Space>
      <Space py={{ xs: 6, lg: 15 }} mt={10}>
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
