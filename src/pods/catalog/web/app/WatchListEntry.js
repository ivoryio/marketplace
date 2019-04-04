import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import Carousel from '@brainhubeu/react-carousel'
import styled from 'styled-components'

import { Box, Flex, Icon, Space, Typography } from '@ivoryio/kogaio'

import '@brainhubeu/react-carousel/lib/style.css'
import { CardWatch } from './components'

const ArrowLeft = () => (
  <Space mb={5} mr={3}>
    <StyledIcon
      alignSelf='center'
      color='pastel-blue'
      name='arrow_back'
      fontSize={5}
    />
  </Space>
)

const ArrowRight = () => (
  <Space mb={5} ml={3}>
    <StyledIcon
      alignSelf='center'
      color='pastel-blue'
      name='arrow_forward'
      fontSize={5}
    />
  </Space>
)

const HideArrow = () => <div style={{ display: 'none' }} />
const WatchListEntry = props => {
  const [activeElement, setActiveElement] = useState(0)
  const [isFetching, setIsFetching] = useState(false)
  const [newestWatches, setNewestWatches] = useState([])

  const fetchWatches  = async () => {
    try {
      setIsFetching(true)
      const response = await API.get('watches', 'products?filter=newest', {response: true})
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
    return <Typography
      textAlign='center'
      textStyle='h2'
      >Loading Newest Watches...</Typography>
  }
  return (
    <Flex
      flexDirection='column'
      alignItems='center'
    >
        <Typography textStyle='h5' color='gunmetal'>Newest Watches Section</Typography>
      <Space mt={1}>
        <Typography textStyle='h5' color='manatee'>Subtitle with a call to action label goes here</Typography>
      </Space>
      <Space px={2} mt={5}>
        <CarouselWrapper  width={{ xs: 1, md: 3 / 4, lg: 3 / 4 }}>
          <StyledCarousel
            arrowLeft={<ArrowLeft />}
            arrowRight={<ArrowRight />}
            addArrowClickHandler
            infinite
            itemWidth={212}
            value={activeElement}
            onChange={setActiveElement}
            slidesPerPage={4}
            slidesPerScroll={1}
            breakpoints={{
              1280: {
                slidesPerPage: 4,
                slidesPerScroll: 1,
                clickToChange: false,
                centered: false,
                infinite: true
              },
              768: {
                arrowLeft: <HideArrow />,
                arrowRight: <HideArrow />,
                slidesPerPage: 3,
                slidesPerScroll: 1,
                clickToChange: false,
                centered: false,
                infinite: true,
                animationSpeed: 2000
              },
              480: {
                arrowLeft: <HideArrow />,
                arrowRight: <HideArrow />,
                slidesPerPage: 2,
                slidesPerScroll: 1,
                clickToChange: false,
                centered: false,
                infinite: true,
                animationSpeed: 2000
              },
              360: {
                arrowLeft: <HideArrow />,
                arrowRight: <HideArrow />,
                slidesPerPage: 2,
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
                      imgHeight={140}
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
const StyledIcon = styled(Icon)`
  cursor: pointer;
`
const CarouselWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export default WatchListEntry
