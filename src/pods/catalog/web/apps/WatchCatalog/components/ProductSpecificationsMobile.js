import React, { Fragment, useState, useContext } from 'react'
import {
  Flex,
  Typography,
  Space,
  Touchable
} from '@ivoryio/kogaio'

import { NavigationContext } from '../WatchCatalogEntry'
import { TablesOnMobile } from '.'

const ProductSpecificationsMobile = ({ ...props }) => {
  const [activeSection, setActiveSection] = useState('details')
  const { watchDetails: { data: { listingNumber, referenceNumber, brand, model, movement, year, gender, caliber: Caliber, case: Case, strap: Strap, description } } } = useContext(NavigationContext)
  
  const infoSectionData = {
    listingNumber,
    referenceNumber,
    brand,
    model,
    movement,
    caseMaterial: Case.caseMaterial,
    braceletMaterial: Strap.braceletMaterial,
    year,
    gender
  }
  const tableData = { Info: infoSectionData, Caliber, Case, Strap }
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
        <Space ml={{ xs: 8, md: 15 }}>
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
          ? <Typography lineHeight='26px' color='gunmetal' fontSize={2} fontWeight={0}>{description}</Typography>
            : tableKeys.map(keyAsName => (
              <Fragment key={`${keyAsName}-table`}>
                <Space mt={4}>
                  <Typography color='pastel-blue' fontSize={0} fontWeight={2}>{keyAsName}</Typography>
                </Space>
                <Space mt={2}>
                  <TablesOnMobile options={tableData[keyAsName]} />
                </Space>
              </Fragment>
            ))
        }
      </Space>
    </Flex>
  )
}

export default ProductSpecificationsMobile
