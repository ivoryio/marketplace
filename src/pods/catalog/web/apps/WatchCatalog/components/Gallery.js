import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Image, Flex, Space, themeGet, Touchable } from '@ivoryio/kogaio'

const images = [{ key: 'img1', src: 'https://images-na.ssl-images-amazon.com/images/I/71gdBQP%2BqGL._UL1500_.jpg'}, { key: 'img2', src: 'https://images-na.ssl-images-amazon.com/images/I/71gdBQP%2BqGL._UL1500_.jpg'}, { key: 'img3', src: 'https://images-na.ssl-images-amazon.com/images/I/71gdBQP%2BqGL._UL1500_.jpg'}, { key: 'img4', src: 'https://images-na.ssl-images-amazon.com/images/I/71gdBQP%2BqGL._UL1500_.jpg'}]

const Gallery = ({ imgList, ...props }) => {
  const [activeImageSrc, setActiveImageSrc] = useState('')
  
  return (
    <>
      <Space pl={{ xs: 4 }} pr={{ xs: 4, md: 0 }}>
        <Flex alignItems='center' justifyContent='center' width={{ xs: 1, md: 1 / 2, lg: 1 }}>
          <Image
            src={activeImageSrc || imgList[0]}
            width={1}
            height={{ xs: 248, md: 328 }}
            objectFit='contain'
            borderRadius={1}
          />
        </Flex>
      </Space>
      <Space px={{ xs: 2 }} py={{ xs: 2 }}>
        <Flex flexWrap='wrap' width={{ xs: 1, md: 1 / 2, lg: 1 }}>
          {
            (imgList || images).map((imgSrc, index) => (
              <Space
                key={`detail-image-${index}`}
                p={{ xs: 2 }}
              >
                <Box width={{ xs: 1 / 4, md: 1 / 2, lg: 1 / 4 }}>
                  <Touchable effect='opacity' onClick={() => setActiveImageSrc(imgSrc)}>
                    <ImageContainer
                      bg='white'
                      alignItems='center'
                      justifyContent='center'
                      width={1}
                    >
                      <Image
                        src={imgSrc}
                        width={1}
                        height={{ xs: 70, md: 156, lg: 133 }}
                        objectFit='contain'
                      />
                    </ImageContainer>
                  </Touchable>
                </Box>
              </Space>
            ))
          }
        </Flex>
      </Space>
    </>
  )
}

const ImageContainer = styled(Flex)`
  border: ${themeGet('borders.1')} ${themeGet('colors.ghost-white')};
`

Gallery.propTypes = {
  imgList: PropTypes.array
}

export default Gallery
