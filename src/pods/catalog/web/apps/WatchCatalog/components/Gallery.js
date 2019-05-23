import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Image, Flex, Space, themeGet, Touchable } from '@ivoryio/kogaio'

const Gallery = ({ imgList, isAwaitingData, ...props }) => {
  const [activeImageSrc, setActiveImageSrc] = useState('')

  return (
    <>
      <Space pl={{ xs: 4 }} pr={{ xs: 4, md: 0 }}>
        <Flex
          alignItems='center'
          justifyContent='center'
          width={{ xs: 1, md: 1 / 2, lg: 1 }}>
          {isAwaitingData ? (
            <Box
              bg='ice-white'
              borderRadius={1}
              width={1}
              height={{ xs: 248, md: 328 }}
            />
          ) : (
            <Image
              src={activeImageSrc || imgList[0]}
              width={1}
              height={{ xs: 248, md: 328 }}
              objectFit='contain'
              borderRadius={1}
            />
          )}
        </Flex>
      </Space>
      <Space px={{ xs: 2 }} py={{ xs: 2 }}>
        <Flex flexWrap='wrap' width={{ xs: 1, md: 1 / 2, lg: 1 }}>
          {imgList.map((imgSrc, ix) => (
            <Space
              key={`gallery-image-${Math.random()
                .toString(36)
                .substring(7)}`}
              p={{ xs: 2 }}>
              <Box width={{ xs: 1 / 4, md: 1 / 2, lg: 1 / 4 }}>
                <Touchable
                  effect='opacity'
                  onClick={() => setActiveImageSrc(imgSrc)}
                  width={1}>
                  <ImageContainer
                    bg='white'
                    alignItems='center'
                    justifyContent='center'
                    width={1}>
                    {isAwaitingData ? (
                      <Box bg='ice-white' minHeight='104px' width={1} />
                    ) : (
                      <Image
                        src={imgSrc}
                        width={1}
                        objectFit='contain'
                        alt={`image-${ix + 1}`}
                      />
                    )}
                  </ImageContainer>
                </Touchable>
              </Box>
            </Space>
          ))}
        </Flex>
      </Space>
    </>
  )
}

const ImageContainer = styled(Flex)`
  border: ${themeGet('borders.1')} ${themeGet('colors.ghost-white')};
`

Gallery.propTypes = {
  imgList: PropTypes.array,
  isAwaitingData: PropTypes.bool
}

Gallery.defaultProps = {
  imgList: Array(4).fill('')
}

export default Gallery
