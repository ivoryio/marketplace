import React, { useState, useEffect } from 'react'
import { Hub } from '@aws-amplify/core'
import styled from 'styled-components'
import Carousel from '@brainhubeu/react-carousel'
import { Box, Flex, Hide, Space, Typography } from '@ivoryio/kogaio'

import { Arrow, CardWatch } from '../../components'
import '@brainhubeu/react-carousel/lib/style.css'
import api from '../../services/catalog.dataservice'

const isResponseOk = statusCode => statusCode >= 200 && statusCode < 300
const groupCards = arr => {
  const length = arr.length
  let index = 0
  let newArr = []
  while (index + 2 - length <= 0) {
    newArr.push([arr[index], arr[index + 1], arr[index + 2]])
    index += 3
  }
  return newArr
}

const mapGroupsToSlides = arr => {
  const _selectWatch = targetWatch => () =>
    Hub.dispatch(
      'TransitionChannel',
      {
        event: 'transition',
        data: {
          destination: 'watch-details',
          targetWatch
        },
        message: `Request to transition to WatchDetails`
      },
      'SpotlightWatches'
    )
  return arr.map(([first, second, third], index) => (
    <Flex
      alignItems='center'
      flexWrap='wrap'
      justifyContent='center'
      key={first.id}
      pb={1}
      width={1}>
      <Space mt={3} px={{ xs: 2, lg: 3 }}>
        <Box width={{ xs: 1, md: 3 / 5, lg: 1 / 2 }}>
          <CardWatch
            key={first.id}
            description={first.description}
            descriptionFontStyle='h4'
            descriptionPadding={{ xs: 8, md: 10 }}
            imgHeight='250px'
            imgSrc={first.imgSrc}
            onClick={_selectWatch(first.id)}
            buttonAlignment='left'
            buttonLabel='View'
            width={1}
          />
        </Box>
      </Space>
      <Space mt={3} px={{ xs: 2, lg: 3 }}>
        <Box width={{ xs: 1 / 2, md: 2 / 5, lg: 1 / 4 }}>
          <CardWatch
            key={second.id}
            description={second.description}
            imgHeight='250px'
            imgSrc={second.imgSrc}
            onClick={_selectWatch(second.id)}
            buttonLabel='View'
            buttonAlignment='center'
            width={1}
          />
        </Box>
      </Space>
      <Hide md>
        <Space mt={3} px={{ xs: 2, lg: 3 }}>
          <Box width={{ xs: 1 / 2, lg: 1 / 4 }}>
            <CardWatch
              key={third.id}
              description={third.description}
              imgHeight='250px'
              imgSrc={third.imgSrc}
              onClick={_selectWatch(third.id)}
              buttonLabel='View'
              buttonAlignment='center'
              width={1}
            />
          </Box>
        </Space>
      </Hide>
    </Flex>
  ))
}
const SpotlightWatches = () => {
  const [activeElement, setActiveElement] = useState(0)
  const [watches, setSpotlightWatches] = useState({
    data: [],
    isFetching: true,
    error: null
  })

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const response = await api.getFewSpotlightWatches()
        if (isResponseOk(response.status)) {
          const groups = groupCards(response.data.items)
          const slides = mapGroupsToSlides(groups)
          setSpotlightWatches({ data: slides, isFetching: false })
        } else {
          setSpotlightWatches(prevWatches => ({
            ...prevWatches,
            isFetching: false,
            error: '* Failed to get spotlight watches'
          }))
        }
      } catch (error) {
        setSpotlightWatches(prevWatches => ({
          ...prevWatches,
          isFetching: false,
          error: '* Failed to get spotlight watches'
        }))
        console.error('* Error caught while fetching spotlight watches.', error)
      }
    }
    fetchWatches()
  }, [])

  const { data, isFetching } = watches
  return (
    <Flex width={1} flexDirection='column' alignItems='center'>
      <Space px={4}>
        <Typography color='gunmetal' textAlign='center' variant='h5'>
          Spotlight Watches
        </Typography>
      </Space>
      <Space mt={1} px={4}>
        <Typography color='manatee' textAlign='center' variant='h5'>
          Hurry up while they are still available!
        </Typography>
      </Space>
      <Space mt={4} px={8}>
        <Flex justifyContent='center' width={1}>
          <SpotlightCarousel
            addArrowClickHandler
            arrowLeft={<Arrow direction='left' />}
            arrowRight={<Arrow direction='right' />}
            infinite
            value={activeElement}
            onChange={setActiveElement}
            slidesPerPage={1}
            slidesPerScroll={1}
            breakpoints={{
              1279: {
                centered: false,
                arrowLeft: null,
                arrowRight: null
              },
              768: {
                arrowLeft: null,
                arrowRight: null,
                centered: false,
                animationSpeed: 2000
              },
              480: {
                arrowLeft: null,
                arrowRight: null,
                centered: false,
                animationSpeed: 2000
              },
              360: {
                arrowLeft: null,
                arrowRight: null,
                clickToChange: false,
                animationSpeed: 2000
              }
            }}>
            {isFetching ? (
              <LoadingPlaceholder />
            ) : (
              data.map(cardWithWatches => cardWithWatches)
            )}
          </SpotlightCarousel>
        </Flex>
      </Space>
    </Flex>
  )
}

const SpotlightCarousel = styled(Carousel)`
  width: 100%;
`

const LoadingPlaceholder = () => (
  <Flex alignItems='center' flexWrap='wrap' width={1}>
    <Space mt={3} px={{ xs: 2, lg: 3 }}>
      <Box width={{ xs: 1, md: 3 / 5, lg: 1 / 2 }}>
        <Box
          bg='ice-white'
          borderRadius={3}
          height={{ xs: '326px', sm: '312px', md: '314px', lg: '366px' }}
          width={1}
        />
      </Box>
    </Space>
    <Space mt={3} px={{ xs: 2, lg: 3 }}>
      <Box width={{ xs: 1 / 2, md: 2 / 5, lg: 1 / 4 }}>
        <Box
          bg='ice-white'
          borderRadius={3}
          height={{ xs: '326px', sm: '312px', md: '314px', lg: '366px' }}
          width={1}
        />
      </Box>
    </Space>
    <Hide md>
      <Space mt={3} px={{ xs: 2, lg: 3 }}>
        <Box width={{ xs: 1 / 2, lg: 1 / 4 }}>
          <Box
            bg='ice-white'
            borderRadius={3}
            height={{ xs: '326px', sm: '312px', md: '314px', lg: '366px' }}
            width={1}
          />
        </Box>
      </Space>
    </Hide>
  </Flex>
)

export default SpotlightWatches
