import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  Typography,
  themeGet,
  Space
} from '@ivoryio/kogaio'

const InfoTable = ({ columnsWidth, options, ...props }) => (
  <Table columnsWidth={columnsWidth} {...props}>
    {
      options.map(option => {
        const { name, value } = option
        return (
          <>
              <Space pl={{ xs: 2, md: 5, lg: 4 }} py={3}>
                <OptionName color='gunmetal' fontSize={1} fontWeight={1}>{name}</OptionName>
              </Space>
              <Space pr={{ xs: 2, md: 5, lg: 4 }} py={3}>
                <OptionValue textAlign='right' alignItems='center' color='gunmetal' fontSize={1} fontWeight={0}>{value}</OptionValue>
              </Space>
          </>
        )
      })
    }
  </Table>
)

const Table = styled.div`
  display: grid;
  grid-template-columns: ${props => `${props.columnsWidth[0]}fr ${props.columnsWidth[1]}fr`};
  grid-gap: 0;
  & :not(:nth-child(-n+2)) {
    border-block-end: ${themeGet('borders.1')} ${themeGet('colors.pastel-blue')}
  }
`
const OptionName = styled(Typography)`
  background: ${themeGet('colors.ghost-white')};
  border-inline-start: ${themeGet('borders.1')} ${themeGet('colors.pastel-blue')};
  border-block-start: ${themeGet('borders.1')} ${themeGet('colors.pastel-blue')};
  border-inline-end: ${themeGet('borders.1')} ${themeGet('colors.pastel-blue')};
`
const OptionValue = styled(Typography)`
  border-block-start: ${themeGet('borders.1')} ${themeGet('colors.pastel-blue')};
  border-inline-end: ${themeGet('borders.1')} ${themeGet('colors.pastel-blue')};
`

InfoTable.propTypes = {
  columnsWidth: PropTypes.arrayOf(PropTypes.number),
  options: PropTypes.arrayOf(PropTypes.object)
}

InfoTable.defaultProps = {
  columnsWidth: [0.3, 0.7]
}

export default InfoTable
