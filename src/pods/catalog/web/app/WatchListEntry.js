import React, { useState, useEffect } from 'react'
import Carousel, { Dots } from '@brainhubeu/react-carousel'
import styled from 'styled-components'
import useWindowSize from '../../../../app/services/useWindowSize'

import { Box, Flex, Icon, Space } from '@ivoryio/kogaio'

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

const watches = [
  {
    id: 'watch1',
    title: 'Product Title 1',
    description: 'Text for description of this card goes here',
    imgSrc:
      'https://cdn.gearpatrol.com/wp-content/uploads/2018/12/A-Guide-To-Watch-Microbrands-gear-patrol-lead-full.jpg',
    buttonLabel: 'Button Label 1',
    onClick: () => {}
  },
  {
    id: 'watch2',
    title: 'Product Title 2',
    description: 'Text for description of this card goes here',
    imgSrc:
      'https://cdn.gearpatrol.com/wp-content/uploads/2018/12/A-Guide-To-Watch-Microbrands-gear-patrol-lead-full.jpg',
    buttonLabel: 'Button Label 2',
    onClick: () => {}
  },
  {
    id: 'watch3',
    title: 'Product Title 3',
    description: 'Text for description of this card goes here',
    imgSrc:
      'https://cdn.gearpatrol.com/wp-content/uploads/2018/12/A-Guide-To-Watch-Microbrands-gear-patrol-lead-full.jpg',
    buttonLabel: 'Button Label 3',
    onClick: () => {}
  },
  {
    id: 'watch4',
    title: 'Product Title 4',
    description: 'Text for description of this card goes here',
    imgSrc:
      'https://cdn.gearpatrol.com/wp-content/uploads/2018/12/A-Guide-To-Watch-Microbrands-gear-patrol-lead-full.jpg',
    buttonLabel: 'Button Label 4',
    onClick: () => {}
  }
]

const WatchListEntry = props => {
  const onSizeChange = width => {
    if (width > 720) {
      setCarouselValues({
        offset: 24,
        dots: 0
      })
      return
    }
    if (width <= 720 && width >= 463) {
      setCarouselValues({
        offset: 16,
        dots: 3
      })
    } else {
      setCarouselValues({
        ...carouselValues,
        dots: 2
      })
    }
  }

  const [activeElement, setActiveElement] = useState(0)
  const [carouselValues, setCarouselValues] = useState({ offset: 24, dots: 0 })
  const { innerWidth } = useWindowSize()

  useEffect(() => {
    onSizeChange(innerWidth)
  }, [innerWidth])
  const { offset, dots }  = carouselValues
  return (
    <Flex
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
    >
      <CarouselWrapper  width={{ xs: 1, md: 3 / 4, lg: 0.72 }}>
        <StyledCarousel
          arrowLeft={<ArrowLeft />}
          arrowRight={<ArrowRight />}
          addArrowClickHandler
          offset={offset}
          infinite
          itemWidth={212}
          value={activeElement}
          onChange={setActiveElement}
          slidesPerPage={4}
          slidesPerScroll={1}
          breakpoints={{
            1440: {
              slidesPerPage: 4,
              slidesPerScroll: 1,
              clickToChange: false,
              centered: false,
              infinite: true
            },
            720: {
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
          {watches.map(watch => {
            const {
              id,
              title,
              description,
              imgSrc,
              buttonLabel,
              onClick
            } = watch
            return (
              <CardWatch
                key={id}
                buttonLabel={buttonLabel}
                title={title}
                description={description}
                imgSrc={imgSrc}
                onClick={onClick}
              />
            )
          })}
        </StyledCarousel>
        <Dots value={activeElement} onChange={setActiveElement} number={dots} />
      </CarouselWrapper>
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
