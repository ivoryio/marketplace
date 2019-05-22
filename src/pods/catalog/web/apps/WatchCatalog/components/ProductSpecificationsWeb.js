import React, { Fragment, useContext } from 'react'
import { Flex, Typography, Space } from '@ivoryio/kogaio'

import { capitalizeFirstChar } from '../services/helpers'
import { DetailsContext } from '../services/DetailsProvider'

import { InfoTable, DescriptionPlaceholder } from '.'

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
    },
    isFetching: isAwaitingData
  } = useContext(DetailsContext)

  const tableData = isAwaitingData
    ? {}
    : {
        info: {
          listingNumber,
          referenceNumber,
          brand,
          model,
          movement,
          caseMaterial: watchCase.caseMaterial,
          braceletMaterial: strap.braceletMaterial,
          year,
          gender
        },
        caliber,
        watchCase,
        strap
      }

  return (
    <Flex flexDirection='column' {...props}>
      <Typography id='details' color='gunmetal' fontSize={3} fontWeight={0}>
        Details
      </Typography>
      <Space mt={2}>
        {isAwaitingData ? (
          <DescriptionPlaceholder />
        ) : (
          <Typography
            lineHeight={2}
            color='gunmetal'
            fontSize={1}
            fontWeight={0}>
            {description}
          </Typography>
        )}
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
      <Info isAwaitingData={isAwaitingData} tableData={tableData} />
    </Flex>
  )
}

const Info = ({ isAwaitingData, tableData }) =>
  Object.keys(tableData).map(key => {
    const sectionName = key.includes('watchCase')
      ? 'Case'
      : capitalizeFirstChar(key)
    return (
      <Fragment key={`${key}-table`}>
        <Space mt={4}>
          <Typography color='pastel-blue' fontSize={0} fontWeight={2}>
            {sectionName}
          </Typography>
        </Space>
        <Space mt={2}>
          <InfoTable options={tableData[key]} isAwaitingData={isAwaitingData} />
        </Space>
      </Fragment>
    )
  })

export default ProductSpecificationsWeb
