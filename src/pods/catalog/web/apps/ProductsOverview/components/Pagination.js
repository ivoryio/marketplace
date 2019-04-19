import React from 'react'
import { PropTypes } from 'prop-types'
import { SquaredBox } from '.'
import { Icon, Typography } from '@ivoryio/kogaio'

const Pagination = ({ currPage, maxPages, setCurrentPage }) => {
  const _decrement = ev => {
    if (currPage === 1) {
      return ev.preventDefault()
    }
    setCurrentPage(currPage - 1)
  }

  const _jump = ev => {
    const HOPPER = 10
    if (currPage + HOPPER > maxPages) {
      return setCurrentPage(maxPages)
    }
    setCurrentPage(currPage + HOPPER)
  }

  const _increment = ev => {
    if (currPage === maxPages) {
      return ev.preventDefault()
    }

    setCurrentPage(currPage + 1)
  }
  return (
    <>
      <SquaredBox onClick={_decrement}>
        <Icon color='pastel-blue' fontSize={1} name='arrow_back' />
      </SquaredBox>
      <SquaredBox bg='green'>
        <Typography color='pastel-blue' fontSize={1}>
          {currPage}
        </Typography>
      </SquaredBox>
      <SquaredBox onClick={_increment}>
        <Typography color='pastel-blue' fontSize={1}>
          {currPage + 1}
        </Typography>
      </SquaredBox>
      <SquaredBox onClick={_jump}>
        <Typography color='pastel-blue' fontSize={1}>
          ...
        </Typography>
      </SquaredBox>
      <SquaredBox>
        <Typography color='pastel-blue' fontSize={1}>
          50
        </Typography>
      </SquaredBox>
      <SquaredBox onClick={_increment}>
        <Icon color='pastel-blue' fontSize={1} name='arrow_forward' />
      </SquaredBox>
    </>
  )
}

Pagination.propTypes = {
  currPage: PropTypes.number,
  maxPages: PropTypes.number,
  setCurrentPage: PropTypes.func
}

Pagination.defaultProps = {
  maxPages: 50
}

export default Pagination
