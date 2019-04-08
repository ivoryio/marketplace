import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { API } from 'aws-amplify'
import Carousel from '@brainhubeu/react-carousel'
import { Box, Flex, Hide, Space, Typography } from '@ivoryio/kogaio'

import { Arrow, CardWatch } from './components'
import '@brainhubeu/react-carousel/lib/style.css'

const HideArrow = () => <div style={{ display: 'none' }} />

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

const mapGroupsToSlides = arr =>
  arr.map((group, index) => {
    const [first, second, third] = group
    return (
      <Flex
        alignItems='center'
        flexDirection='row'
        flexWrap='wrap'
        justifyContent='center'
        key={`carousel-spotlight-${index}`}
        width={1}
      >
        <Space mt={3} px={{ xs: 2, lg: 3 }}>
          <Box width={{ xs: 1, md: 3 / 5, lg: 1 / 2 }}>
            <CardWatch
              borderRadius={3}
              key={first.id}
              description={first.description}
              descriptionFontStyle='h4'
              descriptionPadding={{ xs: 6, md: 7 }}
              imgHeight='250px'
              imgSrc={first.imgSrc}
              onClick={() => {}}
              buttonAlignment='left'
              buttonLabel='Button Label'
              width={1}
            />
          </Box>
        </Space>
        <Space mt={3} px={{ xs: 2, lg: 3 }}>
          <Box width={{ xs: 1 / 2, md: 2 / 5, lg: 1 / 4 }}>
            <CardWatch
              borderRadius={3}
              key={second.id}
              description={second.description}
              imgHeight='250px'
              imgSrc={second.imgSrc}
              onClick={() => {}}
              buttonLabel='Button Label'
              buttonAlignment='center'
              width={1}
            />
          </Box>
        </Space>
        <Hide md>
          <Space mt={3} px={{ xs: 2, lg: 3 }}>
            <Box width={{ xs: 1 / 2, lg: 1 / 4 }}>
              <CardWatch
                borderRadius={3}
                key={third.id}
                description={third.description}
                imgHeight='250px'
                imgSrc={third.imgSrc}
                onClick={() => {}}
                buttonLabel='Button Label'
                buttonAlignment='center'
                width={1}
              />
            </Box>
          </Space>
        </Hide>
      </Flex>
    )
  })

const SpotlightWatchesEntry = () => {
  const [activeElement, setActiveElement] = useState(0)
  const [isFetching, setIsFetching] = useState(false)
  const [spotlightWatches, setSpotlightWatches] = useState([])

  const fetchWatches = async () => {
    try {
      setIsFetching(true)
      const response = await API.get('catalog', 'products?filter=spotlight', {
        response: true
      })
      const groups = groupCards(response.data)
      const slides = mapGroupsToSlides(groups)
      setSpotlightWatches(slides)
    } catch (error) {
      console.error('Error caught while fetching the newest watches:', error)
    } finally {
      setIsFetching(false)
    }
  }
  useEffect(() => {
    fetchWatches()
  }, [])

  if (isFetching) {
    return (
      <Typography textAlign='center' textStyle='h2'>
        Loading Spotlight Watches...
      </Typography>
    )
  }
  return (
    <Flex width={1} flexDirection='column' alignItems='center'>
      <Space px={4}>
        <Typography color='gunmetal' textAlign='center' textStyle='h5'>
          Spotlight Section
        </Typography>
      </Space>
      <Space mt={1} px={4}>
        <Typography color='manatee' textAlign='center' textStyle='h5'>
          Subtitle with a call to action label goes here
        </Typography>
      </Space>
      <Space px={2} mt={5}>
        <CarouselWrapper width={{ xs: 1, md: 1, lg: 3 / 4 }}>
          <StyledCarousel
            arrowLeft={<Arrow direction='left' />}
            arrowRight={<Arrow direction='right' />}
            addArrowClickHandler
            infinite={false}
            value={activeElement}
            onChange={setActiveElement}
            slidesPerPage={1}
            slidesPerScroll={1}
            breakpoints={{
              1279: {
                centered: false,
                infinite: false,
                arrowLeft: <HideArrow />,
                arrowRight: <HideArrow />
              },
              768: {
                arrowLeft: <HideArrow />,
                arrowRight: <HideArrow />,
                centered: false,
                infinite: false,
                animationSpeed: 2000
              },
              480: {
                arrowLeft: <HideArrow />,
                arrowRight: <HideArrow />,
                centered: false,
                infinite: false,
                animationSpeed: 2000
              },
              360: {
                arrowLeft: <HideArrow />,
                arrowRight: <HideArrow />,
                clickToChange: false,
                infinite: false,
                animationSpeed: 2000
              }
            }}
          >
            {spotlightWatches.map(cardWithWatches => cardWithWatches)}
          </StyledCarousel>
        </CarouselWrapper>
      </Space>
    </Flex>
  )
}

const CarouselWrapper = styled(Box)`
  display: flex;
  justify-content: center;
`
const StyledCarousel = styled(Carousel)`
  width: 100%;

  .BrainhubCarouselItem div {
    margin-bottom: 4px;
  }
`

export default SpotlightWatchesEntry
