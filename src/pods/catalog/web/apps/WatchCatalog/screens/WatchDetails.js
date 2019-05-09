import React, { useContext } from 'react'
import styled from 'styled-components'
import { Box, Flex, Image, themeGet, Space } from '@ivoryio/kogaio'

import { NavigationContext } from '../WatchCatalogEntry'

const images = [{ key: 'img1', src: 'https://images-na.ssl-images-amazon.com/images/I/71gdBQP%2BqGL._UL1500_.jpg'}, { key: 'img2', src: 'https://images-na.ssl-images-amazon.com/images/I/71gdBQP%2BqGL._UL1500_.jpg'}, { key: 'img3', src: 'https://images-na.ssl-images-amazon.com/images/I/71gdBQP%2BqGL._UL1500_.jpg'}, { key: 'img4', src: 'https://images-na.ssl-images-amazon.com/images/I/71gdBQP%2BqGL._UL1500_.jpg'}]

const WatchDetails = () => {
  const { currentScreen } = useContext(NavigationContext)
  if (!currentScreen.includes('watch-details')) {
    return null
  }
  return (
    <Flex flexWrap='wrap'>
      <Flex flexWrap='wrap' width={{ xs: 1, lg: 4 / 10 }}>
        <Space pl={{ xs: 4 }} pr={{ xs: 4, md: 0 }}>
          <Flex alignItems='center' justifyContent='center' width={{ xs: 1, md: 1 / 2, lg: 1 }}>
            <Image
              width={1}
              height={{ xs: 248, md: 328 }}
              objectFit='contain'
              borderRadius={1}
            />
          </Flex>
        </Space>
        <Space px={{ xs: 2 }} py={{ xs: 2 }}>
          <AvailableImages flexWrap='wrap' width={{ xs:1, md: 1 / 2, lg: 1 }}>
            {
              images.map(image => (
                <Space
                  key={image.key}
                  p={{xs: 2}}>
                  <Box width={{ xs: 1 / 4, md: 1 / 2, lg: 1 / 4 }}>
                    <ImageContainer
                      bg='white'
                      alignItems='center'
                      justifyContent='center'
                      width={1}
                    >
                      <Image
                        src={image.src}
                        width={1}
                        height={{ xs: 70, md: 156, lg: 133 }}
                        objectFit='contain'
                      />
                    </ImageContainer>
                  </Box>
                </Space>
              ))
            }
          </AvailableImages>
        </Space>
      </Flex>
    </Flex>
  )
}

const AvailableImages = styled(Flex)`
`
const ImageContainer = styled(Flex)`
  border: ${themeGet('borders.1')} ${themeGet('colors.ghost-white')};
`

export default WatchDetails

