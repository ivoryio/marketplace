import React, { Fragment, useState, useContext } from 'react'
import styled, { css } from 'styled-components'
import { Flex, Typography, Space, themeGet, Touchable } from '@ivoryio/kogaio'

import { DetailsContext } from '../services/DetailsProvider'
import { TablesOnMobile, DescriptionPlaceholder } from '.'
import { capitalizeFirstChar } from '../services/helpers'

const ProductSpecificationsMobile = ({ ...props }) => {
  const [activeSection, setActiveSection] = useState('details')
  const {
    details: {
      listingNumber,
      referenceNumber,
      brand,
      model,
      movement,
      year,
      gender,
      caliber,
      case: watchCase,
      strap,
      description
    },
    isFetching: isAwaitingData
  } = useContext(DetailsContext)

  const infoSectionData = isAwaitingData
    ? {}
    : {
        listingNumber,
        referenceNumber,
        brand,
        model,
        movement,
        caseMaterial: watchCase.caseMaterial,
        braceletMaterial: strap.braceletMaterial,
        year,
        gender
      }
  const tableData = { info: infoSectionData, caliber, watchCase, strap }
  return (
    <Flex flexDirection='column' {...props}>
      <Flex>
        <Tab
          active={activeSection.includes('details')}
          onClick={() => setActiveSection('details')}>
          <Typography color='gunmetal' fontSize={3} fontWeight={0}>
            Details
          </Typography>
        </Tab>
        <Space ml={{ xs: 8, md: 15 }}>
          <Tab
            active={activeSection.includes('info-stats')}
            onClick={() => setActiveSection('info-stats')}>
            <Typography color='gunmetal' fontSize={3} fontWeight={0}>
              Info & Stats
            </Typography>
          </Tab>
        </Space>
      </Flex>
      <Space mt={{ xs: 4, md: 5 }}>
        {activeSection.includes('details') ? (
          isAwaitingData ? (
            <DescriptionPlaceholder />
          ) : (
            <Typography
              lineHeight={2}
              color='gunmetal'
              fontSize={2}
              fontWeight={0}>
              {description}
            </Typography>
          )
        ) : (
          Object.keys(tableData).map(keyAsName => {
            const name = keyAsName.includes('watchCase')
              ? 'Case'
              : capitalizeFirstChar(keyAsName)
            return (
              <Fragment key={`${keyAsName}-table`}>
                <Space mt={4}>
                  <Typography color='pastel-blue' fontSize={0} fontWeight={2}>
                    {name}
                  </Typography>
                </Space>
                <Space mt={2}>
                  <TablesOnMobile options={tableData[keyAsName]} />
                </Space>
              </Fragment>
            )
          })
        )}
      </Space>
    </Flex>
  )
}

const _borderStyle = ({ active, ...props }) => css`
  border-bottom: ${active && themeGet('borders.4')}
    ${active && themeGet('colors.brand')};
`

const Tab = styled(Touchable)`
  ${_borderStyle}
`

export default ProductSpecificationsMobile
