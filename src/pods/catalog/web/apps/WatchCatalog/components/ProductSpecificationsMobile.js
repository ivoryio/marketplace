import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Box,
  Flex,
  Hide,
  Typography,
  Space,
  Touchable
} from '@ivoryio/kogaio'

import { InfoTable } from '.'

const longDescription = 'WatchShopping.com buys and sells brand new prestigous watches from all around the world. All our products are inspected and purchased directly from countries all around the world to provide the lowest cost, yet, best service quality for our customers. We sell brands such as Rolex, Cartier, Omega, Tudor, Vacheron Constantin, Audemars Piguet, Patek Philippe, Officine Panerai, Hublot and more. If you have a specific watch brand and model that you are looking for, please feel free to talk to us and we will assist you to search for it. Please feel free to talk to us for any questions or concerns. '
const options = [
  {
    id: 'movement-option',
    name: 'Movement',
    value: 'Automatic'
  },
  {
    id: 'power-option',
    name: 'Power reserve',
    value: '48h'
  }
]

const TablesOnMobileAndTablet = ({ options, ...props }) => (
  <Flex {...props}>
    <StyledHide md lg xlg>
      <Box width={1}>
        <InfoTable width='100%' columnsWidth={[0.4, 0.6]} options={options} />
      </Box>
    </StyledHide>
    <StyledHide width={1} xs sm lg xlg>
      <Box width={1}>
        <InfoTable width='100%' options={options} />
      </Box>
    </StyledHide>
  </Flex>
)

const ProductSpecificationsMobile = ({...props}) => {
  const [activeSection, setActiveSection] = useState('details')
  return (
    <Flex flexDirection='column' {...props}>
      <Flex>
        <Touchable onClick={() => setActiveSection('details')}>
          <Flex flexDirection='column'>
            <Typography color='gunmetal' fontSize={3} fontWeight={0}>
              Details
            </Typography>
            {
              activeSection.includes('details') ? <Flex bg='brand' borderRadius={1} height='4px' /> : null
            }
          </Flex>
        </Touchable>
        <Space ml={{xs: 8, md: 15}}>
          <Touchable onClick={() => setActiveSection('info&stats')}>
            <Flex flexDirection='column'>
              <Typography color='gunmetal' fontSize={3} fontWeight={0}>
                Info & Stats
              </Typography>
              {
                activeSection.includes('info&stats') ? <Flex bg='brand' borderRadius={1} height='4px' /> : null
              }
            </Flex>
          </Touchable>
        </Space>
      </Flex>
      <Space mt={{ xs: 4, md: 5 }}>
        {activeSection.includes('details')
          ? <Typography lineHeight='26px' color='gunmetal' fontSize={2} fontWeight={0}>{longDescription}</Typography>
            : <TablesOnMobileAndTablet options={options} />
        }
      </Space>
    </Flex>
  )
}

const StyledHide = styled(Hide)`
  width: 100%;
`

TablesOnMobileAndTablet.propTypes  = {
  options: PropTypes.arrayOf(PropTypes.object)
}

export default ProductSpecificationsMobile
