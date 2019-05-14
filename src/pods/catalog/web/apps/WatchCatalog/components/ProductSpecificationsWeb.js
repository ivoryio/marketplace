import React, { useContext } from 'react'
import { Flex, Typography, Space } from '@ivoryio/kogaio'

import { NavigationContext } from '../WatchCatalogEntry'
import { InfoTable } from '.'

const ProductSpecificationsWeb =  props => {
  const { watchDetails: { data: { listingNumber, referenceNumber, brand, model, movement, year, gender, caliber: Caliber, case: Case, strap: Strap, description } } } = useContext(NavigationContext)

  const caseMaterial = Case ? Case.caseMaterial : null
  const braceletMaterial = Case ? Strap.braceletMaterial : null
  const infoSectionData = {
    listingNumber,
    referenceNumber,
    brand,
    model,
    movement,
    caseMaterial,
    braceletMaterial,
    year,
    gender
  }
  const tableData = {
    Info: infoSectionData,
    Caliber,
    Case,
    Strap
  }

  const tableKeys = Object.keys(tableData)
  
  return (
    <Flex flexDirection='column' {...props}>
      <Typography color='gunmetal' fontSize={3} fontWeight={0}>Details</Typography>
      <Space mt={2}>
        <Typography lineHeight='26px' color='gunmetal' fontSize={1} fontWeight={0}>{description}</Typography>
      </Space>
      <Space mt={5}>
        <Typography color='gunmetal' fontSize={3} fontWeight={0}>Info & Stats</Typography>
      </Space>
      {
        tableKeys.map(key => (
          <>
            <Space mt={4}>
              <Typography color='pastel-blue' fontSize={0} fontWeight={2}>{key}</Typography>
            </Space>
            <Space mt={2}>
              <InfoTable options={tableData[key]} />
            </Space>
          </>  
        ))
      }
    </Flex>
  )
}

export default ProductSpecificationsWeb
