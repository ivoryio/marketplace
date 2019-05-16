import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Hide } from '@ivoryio/kogaio'

import { InfoTable } from '.'

const TablesOnMobile = ({ options, ...props }) => (
  <Flex {...props}>
    <Hide md lg xlg>
      <Box width={1}>
        <InfoTable width={1} columnsWidth={[0.45, 0.55]} options={options} />
      </Box>
    </Hide>
    <Hide xs sm lg xlg>
      <Box width={1}>
        <InfoTable width={1} options={options} />
      </Box>
    </Hide>
  </Flex>
)

  TablesOnMobile.propTypes = {
    options: PropTypes.object
  }

  export default TablesOnMobile