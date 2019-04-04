import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Flex,
  Image,
  Space,
  Typography
} from '@ivoryio/kogaio'

const categories = [
  {
    id: 'category1',
    imgSrc: 'https://www.rolex.com/content/dam/rolex-58/the-collection/professional-watches/submariner/professional_watches_submariner_video_cover_0001_1920x1080.jpg',
    description: 'The description of this category will go here'
  },
  {
    id: 'category2',
    imgSrc: 'https://www.rolex.com/content/dam/rolex-58/the-collection/professional-watches/submariner/professional_watches_submariner_video_cover_0001_1920x1080.jpg',
    description: 'The description of this category will go here'
  },
  {
    id: 'category3',
    imgSrc: 'https://www.rolex.com/content/dam/rolex-58/the-collection/professional-watches/submariner/professional_watches_submariner_video_cover_0001_1920x1080.jpg',
    description: 'The description of this category will go here'
  },
  {
    id: 'category4',
    imgSrc: 'https://www.rolex.com/content/dam/rolex-58/the-collection/professional-watches/submariner/professional_watches_submariner_video_cover_0001_1920x1080.jpg',
    description: 'The description of this category will go here'
  },
  {
    id: 'category5',
    imgSrc: 'https://www.rolex.com/content/dam/rolex-58/the-collection/professional-watches/submariner/professional_watches_submariner_video_cover_0001_1920x1080.jpg',
    description: 'The description of this category will go here'
  },
  {
    id: 'category6',
    imgSrc: 'https://www.rolex.com/content/dam/rolex-58/the-collection/professional-watches/submariner/professional_watches_submariner_video_cover_0001_1920x1080.jpg',
    description: 'The description of this category will go here'
  },
  {
    id: 'category7',
    imgSrc: 'https://www.rolex.com/content/dam/rolex-58/the-collection/professional-watches/submariner/professional_watches_submariner_video_cover_0001_1920x1080.jpg',
    description: 'The description of this category will go here'
  },
  {
    id: 'category8',
    imgSrc: 'https://www.rolex.com/content/dam/rolex-58/the-collection/professional-watches/submariner/professional_watches_submariner_video_cover_0001_1920x1080.jpg',
    description: 'The description of this category will go here'
  }
]

const SpotlightCategoriesEntry = () => (
  <Flex
    alignItems='center'
    bg='ghost-white'
    flexDirection='column'
    pb={7}
    pt={9}
  >
    <Typography textStyle='h5' color='gunmetal'>Spotlight Categories Section</Typography>
    <Space mt={1}>
    <Typography textStyle='h5' color='manatee'>Subtitle With A Call To Action Goes Here</Typography>
    </Space>
    <Space mt={4} px={{ xs: 2, sm: 5, md: 8, lg: 13 }}>
      <Flex
        flexWrap='wrap'
        justifyContent='center'
        width={1}
      >
        {
          categories.map(category => {
            const { id, imgSrc, description } = category
            return <Space key={id} mb={5} px={{xs: 2, md: 3, lg: 6}}>
              <Box width={{ xs: 1 / 2, md: 3 / 10, lg: 1 / 4 }}>
                <Image src={imgSrc} dimensions={['100%', 120]} />
                <Space mt={2}>
                  <Flex alignItems='center' height='34px'>
                    <StyledDescription
                      color='gunmetal'
                      textStyle='h6'
                      textAlign='center'
                    >
                      {description}
                    </StyledDescription>
                  </Flex>
                </Space>
              </Box>
            </Space>
          })
        }
      </Flex>
    </Space>
  </Flex>
)

const StyledDescription = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export default SpotlightCategoriesEntry
