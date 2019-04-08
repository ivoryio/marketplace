import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import Carousel from '@brainhubeu/react-carousel'
import styled from 'styled-components'

import {
  Box,
  Flex,
  Space,
  Typography
} from '@ivoryio/kogaio'

import '@brainhubeu/react-carousel/lib/style.css'
import { Arrow, CardWatch } from './components'

const HideArrow = () => <div style={{ display: 'none' }} />
const WatchListEntry = props => {
  const [activeElement, setActiveElement] = useState(0)
  const [isFetching, setIsFetching] = useState(false)
  const [newestWatches, setNewestWatches] = useState([])

  const fetchWatches  = async () => {
    try {
      setIsFetching(true)
      const response = await API.get('catalog', 'products?filter=newest', {response: true})
      setNewestWatches(response.data)
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
      <Typography
        textAlign='center'
        textStyle='h2'
      >
        Loading Newest Watches...
      </Typography>
    )
  }
  return (
    <Flex
      flexDirection='column'
      alignItems='center'
    >
      <Space px={4}>
        <Typography
          color='gunmetal'
          textAlign='center'
          textStyle='h5'
        >
          Newest Watches Section
        </Typography>
      </Space>
      <Space mt={1} px={4}>
        <Typography
          color='manatee'
          textAlign='center'
          textStyle='h5'
        >
          Subtitle with a call to action label goes here
        </Typography>
      </Space>
      <Space px={2} mt={5}>
        <CarouselWrapper  width={{ xs: 1, md: 6 / 7, lg: 3 / 4 }}>
          <StyledCarousel
            arrowLeft={<Arrow direction='left' />}
            arrowRight={<Arrow direction='right' />}
            addArrowClickHandler
            infinite={true}
            value={activeElement}
            onChange={setActiveElement}
            slidesPerPage={4}
            slidesPerScroll={1}
            breakpoints={{
              1279: {
                slidesPerPage: 4,
                slidesPerScroll: 1,
                clickToChange: false,
                animationSpeed: 2000
              },
              768: {
                arrowLeft: <HideArrow />,
                arrowRight: <HideArrow />,
                slidesPerPage: 3,
                slidesPerScroll: 1,
                clickToChange: false,
                animationSpeed: 2000
              },
              480: {
                arrowLeft: <HideArrow />,
                arrowRight: <HideArrow />,
                slidesPerPage: 2,
                slidesPerScroll: 1,
                clickToChange: false,
                animationSpeed: 2000
              },
              360: {
                arrowLeft: <HideArrow />,
                arrowRight: <HideArrow />,
                slidesPerPage: 1.5,
                slidesPerScroll: 1,
                clickToChange: true,
                animationSpeed: 2000
              }
            }}
          >
            {newestWatches.map(watch => {
              const {
                id,
                brand,
                model,
                description,
                imgSrc
              } = watch
              return (
                <Space key={id} px={{xs: 2, lg: 3}}>
                  <Box>
                    <CardWatch
                      animated={isFetching}
                      buttonLabel='Button Label'
                      title={`${brand} ${model}`}
                      type='newest'
                      description={description}
                      imgSrc={imgSrc}
                      imgHeight='140px'
                      onClick={() => {}}
                    />
                  </Box>
                </Space>
              )
            })}
          </StyledCarousel>
        </CarouselWrapper>
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
const CarouselWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export default WatchListEntry
