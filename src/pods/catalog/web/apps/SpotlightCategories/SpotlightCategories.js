import React from 'react'
import { Flex, Space, Typography } from '@ivoryio/kogaio'

import { categories } from './data.mock'
import { CategoryCard } from './components'

const SpotlightCategories = () => (
  <Flex
    alignItems='center'
    bg='ghost-white'
    flexDirection='column'
    pb={10}
    pt={16}
  >
    <Space px={4}>
      <Typography color='gunmetal' textAlign='center' variant='h5'>
        Spotlight Categories Section
      </Typography>
    </Space>
    <Space mt={1} px={4}>
      <Typography color='manatee' textAlign='center' variant='h5'>
        Subtitle With A Call To Action Goes Here
      </Typography>
    </Space>
    <Space mt={4} px={{ xs: 2, sm: 5, md: 12, lg: 38 }}>
      <Flex flexWrap='wrap' justifyContent='center' width={1}>
        {categories.map(({ id, imgSrc, description }) => (
          <CategoryCard key={id} imgSrc={imgSrc} description={description} />
        ))}
      </Flex>
    </Space>
  </Flex>
)

export default SpotlightCategories
