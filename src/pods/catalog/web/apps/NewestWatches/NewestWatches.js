import React, { useState, useEffect } from 'react'
import Carousel from '@brainhubeu/react-carousel'
import styled from 'styled-components'

import { Box, Flex, Space, Typography } from '@ivoryio/kogaio'

import '@brainhubeu/react-carousel/lib/style.css'
import { Arrow, CardWatch } from '../../components'
import api from '../../services/catalog.dataservice'
import { isResponseOk } from '../../services/helpers'

const INITIAL_STATE = {
  data: { items: [], itemCount: null },
  isFetching: true,
  error: null
}
const NewestWatches = () => {
  const [activeElement, setActiveElement] = useState(0)
  const [watches, setNewestWatches] = useState(INITIAL_STATE)

  useEffect(() => {
    fetchNewestWatches()
    return () => setNewestWatches({ ...INITIAL_STATE, isFetching: false })
    async function fetchNewestWatches () {
      try {
        const response = await api.getNewestProducts()
        if (isResponseOk(response.status)) {
          setNewestWatches({ data: response.data, isFetching: false })
        } else {
          setNewestWatches(prevWatches => ({
            ...prevWatches,
            isFetching: false,
            error: '* Error caught while retrieving newest watches'
          }))
        }
      } catch (error) {
        console.error('Error caught while fetching the newest watches:', error)
        setNewestWatches(prevRes => ({ ...prevRes, isFetching: false, error }))
      }
    }
  }, [])
  const {
    data: { items },
    isFetching
  } = watches
  return (
    <Flex flexDirection='column' alignItems='center'>
      <Space px={4}>
        <Typography color='gunmetal' textAlign='center' variant='h5'>
          Newest Watches Section
        </Typography>
      </Space>
      <Space mt={1} px={4}>
        <Typography color='manatee' textAlign='center' variant='h5'>
          Subtitle with a call to action label goes here
        </Typography>
      </Space>
      <Space px={2} mt={5}>
        <Flex
          alignItems='center'
          flexDirection='column'
          width={{ xs: 1, md: 6 / 7, lg: 3 / 4 }}>
          {isFetching ? (
            <Typography variant='h5'>Fetching watches...</Typography>
          ) : (
            <StyledCarousel
              arrowLeft={<Arrow direction='left' />}
              arrowRight={<Arrow direction='right' />}
              addArrowClickHandler
              infinite
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
                  arrowLeft: null,
                  arrowRight: null,
                  slidesPerPage: 3,
                  slidesPerScroll: 1,
                  clickToChange: false,
                  animationSpeed: 2000
                },
                480: {
                  arrowLeft: null,
                  arrowRight: null,
                  slidesPerPage: 2,
                  slidesPerScroll: 1,
                  clickToChange: false,
                  animationSpeed: 2000
                },
                360: {
                  arrowLeft: null,
                  arrowRight: null,
                  slidesPerPage: 1.5,
                  slidesPerScroll: 1,
                  clickToChange: true,
                  animationSpeed: 2000
                }
              }}>
              {items.map(({ id, brand, model, description, imgSrc }) => (
                <Space key={id} px={{ xs: 2, lg: 3 }}>
                  <Box>
                    <CardWatch
                      animated={isFetching}
                      buttonLabel='View Details'
                      title={`${brand} ${model}`}
                      type='newest'
                      description={description}
                      imgSrc={imgSrc}
                      imgHeight='140px'
                      onClick={() => {}}
                    />
                  </Box>
                </Space>
              ))}
            </StyledCarousel>
          )}
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

export default NewestWatches
