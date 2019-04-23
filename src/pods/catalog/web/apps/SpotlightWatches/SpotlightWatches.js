import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Carousel from '@brainhubeu/react-carousel'
import {
  ActivityIndicator,
  Box,
  Flex,
  Hide,
  Space,
  Typography
} from '@ivoryio/kogaio'

import { Arrow, CardWatch } from '../../components'
import '@brainhubeu/react-carousel/lib/style.css'
import api from '../../services/catalog.dataservice'

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
  arr.map(([first, second, third], index) => (
    <Flex
      alignItems='center'
      flexWrap='wrap'
      justifyContent='center'
      key={first.id}
      width={1}
    >
      <Space mt={3} px={{ xs: 2, lg: 3 }}>
        <Box width={{ xs: 1, md: 3 / 5, lg: 1 / 2 }}>
          <CardWatch
            borderRadius={3}
            key={first.id}
            description={first.description}
            descriptionFontStyle='h4'
            descriptionPadding={{ xs: 8, md: 10 }}
            imgHeight='250px'
            imgSrc={first.imgsrc}
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
            imgSrc={second.imgsrc}
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
              imgSrc={third.imgsrc}
              onClick={() => {}}
              buttonLabel='Button Label'
              buttonAlignment='center'
              width={1}
            />
          </Box>
        </Space>
      </Hide>
    </Flex>
  ))

const SpotlightWatches = () => {
  const [activeElement, setActiveElement] = useState(0)
  const [watches, setSpotlightWatches] = useState({
    data: [],
    isFetching: true,
    error: null
  })

  useEffect(() => {
    fetchWatches()
  }, [])

  const fetchWatches = async () => {
    try {
      const response = await api.getSpotlightWatches()
      if (response.status === 200) {
        const groups = groupCards(response.data.items)
        const slides = mapGroupsToSlides(groups)
        setSpotlightWatches({ data: slides, isFetching: false })
      } else {
        setSpotlightWatches({
          ...watches,
          isFetching: false,
          error: '* Failed to get spotlight watches'
        })
      }
    } catch (error) {
      setSpotlightWatches({
        ...watches,
        isFetching: false,
        error: '* Failed to get spotlight watches'
      })
      console.error('* Error caught while fetching spotlight watches.', error)
    }
  }
  const { data, isFetching } = watches
  return (
    <Flex width={1} flexDirection='column' alignItems='center'>
      <Space px={4}>
        <Typography color='gunmetal' textAlign='center' variant='h5'>
          Spotlight Section
        </Typography>
      </Space>
      <Space mt={1} px={4}>
        <Typography color='manatee' textAlign='center' variant='h5'>
          Subtitle with a call to action label goes here
        </Typography>
      </Space>
      <Space px={2} mt={5}>
        <Flex justifyContent='center' width={{ xs: 1, md: 1, lg: 3 / 4 }}>
          <StyledCarousel
            addArrowClickHandler
            arrowLeft={<Arrow direction='left' />}
            arrowRight={<Arrow direction='right' />}
            infinite={false}
            value={activeElement}
            onChange={setActiveElement}
            slidesPerPage={1}
            slidesPerScroll={1}
            breakpoints={{
              1279: {
                centered: false,
                infinite: false,
                arrowLeft: null,
                arrowRight: null
              },
              768: {
                arrowLeft: null,
                arrowRight: null,
                centered: false,
                infinite: false,
                animationSpeed: 2000
              },
              480: {
                arrowLeft: null,
                arrowRight: null,
                centered: false,
                infinite: false,
                animationSpeed: 2000
              },
              360: {
                arrowLeft: null,
                arrowRight: null,
                clickToChange: false,
                infinite: false,
                animationSpeed: 2000
              }
            }}
          >
            {isFetching ? (
              <ActivityIndicator
                colors={{ background: 'white', primary: 'gunmetal' }}
                size='32px'
              />
            ) : (
              data.map(cardWithWatches => cardWithWatches)
            )}
          </StyledCarousel>
        </Flex>
      </Space>
    </Flex>
  )
}

const StyledCarousel = styled(Carousel)`
  width: 100%;

  .BrainhubCarouselItem div {
    margin-bottom: 4px;
  }
`

export default SpotlightWatches
