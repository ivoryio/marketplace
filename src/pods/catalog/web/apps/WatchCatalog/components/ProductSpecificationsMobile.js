import React, { useState, useContext } from 'react'
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

import { NavigationContext } from '../WatchCatalogEntry'
import { InfoTable } from '.'

const TablesOnMobileAndTablet = ({ options, ...props }) => (
  <Flex {...props}>
    <StyledHide md lg xlg>
      <Box width={1}>
        <InfoTable width={1} columnsWidth={[0.45, 0.55]} options={options} />
      </Box>
    </StyledHide>
    <StyledHide xs sm lg xlg>
      <Box width={1}>
        <InfoTable width={1} options={options} />
      </Box>
    </StyledHide>
  </Flex>
)

const ProductSpecificationsMobile = ({...props}) => {
  const [activeSection, setActiveSection] = useState('details')
  const { watchDetails: { data: { caliber: Caliber, case: Case, strap: Strap, description } } } = useContext(NavigationContext)
  const tableData = { Caliber, Case, Strap }
  const tableKeys = Object.keys(tableData)

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
        { activeSection.includes('details')
          ? <Typography lineHeight='26px' color='gunmetal' fontSize={2} fontWeight={0}>{description}</Typography>
            : tableKeys.map(key => (
                <>
                  <Space mt={2}>
                    <Typography color='pastel-blue' fontSize={0}>{key}</Typography>
                  </Space>
                  <Space mt={2}>
                    <TablesOnMobileAndTablet options={tableData[key]} />
                  </Space>
                </>
              ))
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
