import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Region } from 'frint-react'
import { Box, Flex, Hide, themeGet, Space } from '@ivoryio/kogaio'
import api from '../../../services/catalog.dataservice'
import { isResponseOk } from '../../../services/helpers'

import { RootContext } from '../CatalogEntry'
import { DetailsContext } from '../services/DetailsProvider'

import {
  AddToCart,
  Gallery,
  BackButton,
  ProductSpecificationsMobile,
  ProductSpecificationsWeb
} from '../components'

const WatchDetails = () => {
  const { navigateTo, selectWatch, selectedWatch } = useContext(RootContext)
  const {
    clearDetails,
    details,
    imgList,
    isFetching: isAwaitingData,
    storeDetails,
    storeDetailsError
  } = useContext(DetailsContext)

  useEffect(() => {
    const hasNoDetails = !Object.keys(details).length
    if (selectedWatch && hasNoDetails) fetchDetails(selectedWatch)

    async function fetchDetails (watchId) {
      try {
        const response = await api.getWatchDetails(watchId)
        if (isResponseOk(response.status)) {
          return storeDetails(response.data)
        } else {
          return storeDetailsError(response.error)
        }
      } catch (err) {
        storeDetailsError(err)
      }
    }
  }, [details, selectedWatch, storeDetails, storeDetailsError])

  const goBack = () => {
    navigateTo('watch-list')
    selectWatch('')
    clearDetails()
  }

  return (
    <Flex flexDirection='column' alignItems='center'>
      <Flex width={{ xs: 1, lg: 2 / 3 }}>
        <Space ml={{ xs: 1, md: 2, lg: 4 }} mt={{ xs: 2, md: 3, lg: 4 }}>
          <BackButton onClick={goBack} />
        </Space>
      </Flex>
      <Space mt={{ xs: 4, lg: 5 }}>
        <Flex flexWrap='wrap' width={{ xs: 1, lg: 2 / 3 }}>
          <Flex flexWrap='wrap' width={{ xs: 1, lg: 3 / 5 }}>
            <Gallery isAwaitingData={isAwaitingData} imgList={imgList} />
            <Hide lg xlg>
              <Space px={4} mt={6}>
                <ProductSpecificationsMobile
                  isAwaitingData={isAwaitingData}
                  width={1}
                />
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
            <AddToCart isAwaitingData={isAwaitingData} />
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
