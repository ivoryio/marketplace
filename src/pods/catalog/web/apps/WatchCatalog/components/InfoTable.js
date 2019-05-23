import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Box, Typography, themeGet, Space } from '@ivoryio/kogaio'
import { transformCamelToSentence } from '../services/helpers'

const InfoTable = ({ isAwaitingData, columnsWidth, options, ...props }) => (
  <Table columnsWidth={columnsWidth} {...props}>
    {Object.keys(options).map((name, index) => {
      const specificationName = transformCamelToSentence(name)
      return (
        <Fragment key={`table-row-${name}`}>
          <Space pl={{ xs: 2, md: 5, lg: 4 }} py={3}>
            {isAwaitingData ? (
              <Box width={4 / 5} height='24px' bg='ice-white' />
            ) : (
              <OptionName>
                <Typography color='gunmetal' fontSize={1} fontWeight={1}>
                  {specificationName}
                </Typography>
              </OptionName>
            )}
          </Space>
          <Space pr={{ xs: 2, md: 5, lg: 4 }} py={3}>
            <OptionValue>
              <Typography
                textAlign='right'
                alignItems='center'
                color='gunmetal'
                fontSize={1}
                fontWeight={0}>
                {Object.values(options)[index]}
              </Typography>
            </OptionValue>
          </Space>
        </Fragment>
      )
    })}
  </Table>
)

const Table = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    `${props.columnsWidth[0]}fr ${props.columnsWidth[1]}fr`};
  grid-gap: 0;
  & ${Box}:last-child {
    border-block-end: ${themeGet('borders.1')} ${themeGet('colors.pastel-blue')};
  }
  & ${Box}:nth-last-child(2) {
    border-block-end: ${themeGet('borders.1')} ${themeGet('colors.pastel-blue')};
  }
`
const OptionName = styled(Box)`
  background: ${themeGet('colors.ghost-white')};
  border-inline-start: ${themeGet('borders.1')}
    ${themeGet('colors.pastel-blue')};
  border-block-start: ${themeGet('borders.1')} ${themeGet('colors.pastel-blue')};
  border-inline-end: ${themeGet('borders.1')} ${themeGet('colors.pastel-blue')};
`
const OptionValue = styled(Box)`
  border-block-start: ${themeGet('borders.1')} ${themeGet('colors.pastel-blue')};
  border-inline-end: ${themeGet('borders.1')} ${themeGet('colors.pastel-blue')};
`

InfoTable.propTypes = {
  isAwaitingData: PropTypes.bool,
  columnsWidth: PropTypes.arrayOf(PropTypes.number),
  options: PropTypes.object
}

InfoTable.defaultProps = {
  columnsWidth: [0.35, 0.65]
}

export default InfoTable
