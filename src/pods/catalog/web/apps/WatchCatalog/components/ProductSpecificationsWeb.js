import React, { Fragment, useContext } from 'react'
import { Flex, Typography, Space } from '@ivoryio/kogaio'

import { DetailsContext } from '../services/DetailsProvider'
import { InfoTable } from '.'
import { capitalizeFirstChar } from '../services/helpers'

const ProductSpecificationsWeb = props => {
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
    }
  } = useContext(DetailsContext)

  const infoSectionData = {
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

  const tableData = {
    info: infoSectionData,
    caliber,
    watchCase,
    strap
  }

  const tableKeys = Object.keys(tableData)

  return (
    <Flex flexDirection='column' {...props}>
      <Typography id='details' color='gunmetal' fontSize={3} fontWeight={0}>
        Details
      </Typography>
      <Space mt={2}>
        <Typography lineHeight={2} color='gunmetal' fontSize={1} fontWeight={0}>
          {description}
        </Typography>
      </Space>
      <Space mt={5}>
        <Typography
          id='info-stats'
          color='gunmetal'
          fontSize={3}
          fontWeight={0}>
          Info & Stats
        </Typography>
      </Space>
      {tableKeys.map(keyAsName => {
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
              <InfoTable options={tableData[keyAsName]} />
            </Space>
          </Fragment>
        )
      })}
    </Flex>
  )
}

export default ProductSpecificationsWeb
