import React from 'react'
import {
  Flex,
  Space,
  Typography
} from '@ivoryio/kogaio'

import { CategoryCard } from './components'
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
    <Space px={4}>
      <Typography
        color='gunmetal'
        textAlign='center'
        textStyle='h5'
      >
        Spotlight Categories Section
      </Typography>
    </Space>
    <Space mt={1} px={4}>
      <Typography
        color='manatee'
        textAlign='center'
        textStyle='h5'
      >
        Subtitle With A Call To Action Goes Here
      </Typography>
    </Space>
    <Space mt={4} px={{ xs: 2, sm: 5, md: 8, lg: 152 }}>
      <Flex
        flexWrap='wrap'
        justifyContent='center'
        width={1}
      >
        {
          categories.map(category => {
            const { id, imgSrc, description } = category
            return (
              <CategoryCard
                key={id}
                imgSrc={imgSrc}
                description={description}
              />
            )
          })
        }
      </Flex>
    </Space>
  </Flex>
)

export default SpotlightCategoriesEntry
